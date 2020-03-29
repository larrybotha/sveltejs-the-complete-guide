
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function get_binding_group_value(group) {
        const value = [];
        for (let i = 0; i < group.length; i += 1) {
            if (group[i].checked)
                value.push(group[i].__value);
        }
        return value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.20.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.20.1 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let h10;
    	let t1;
    	let label0;
    	let input0;
    	let t2;
    	let code0;
    	let t3;
    	let t4;
    	let t5;
    	let label1;
    	let input1;
    	let t6;
    	let code1;
    	let t7;
    	let t8;
    	let t9;
    	let h11;
    	let t11;
    	let p0;
    	let t12;
    	let t13;
    	let t14;
    	let label2;
    	let input2;
    	let t15;
    	let t16;
    	let label3;
    	let input3;
    	let t17;
    	let t18;
    	let label4;
    	let input4;
    	let t19;
    	let t20;
    	let h12;
    	let t22;
    	let p1;
    	let t23;
    	let t24_value = JSON.stringify(/*checkboxGroupValues*/ ctx[3]) + "";
    	let t24;
    	let t25;
    	let label5;
    	let input5;
    	let t26;
    	let t27;
    	let label6;
    	let input6;
    	let t28;
    	let t29;
    	let label7;
    	let input7;
    	let t30;
    	let dispose;

    	const block = {
    		c: function create() {
    			h10 = element("h1");
    			h10.textContent = "Checkboxes";
    			t1 = space();
    			label0 = element("label");
    			input0 = element("input");
    			t2 = text("\n  does not bind to value:\n  ");
    			code0 = element("code");
    			t3 = text("agreedValueBinding === ");
    			t4 = text(/*agreedValueBinding*/ ctx[0]);
    			t5 = space();
    			label1 = element("label");
    			input1 = element("input");
    			t6 = text("\n  binds to checked:\n  ");
    			code1 = element("code");
    			t7 = text("agreedCheckedBinding === ");
    			t8 = text(/*agreedCheckedBinding*/ ctx[1]);
    			t9 = space();
    			h11 = element("h1");
    			h11.textContent = "Radios";
    			t11 = space();
    			p0 = element("p");
    			t12 = text("Active value: ");
    			t13 = text(/*radioGroupValue*/ ctx[2]);
    			t14 = space();
    			label2 = element("label");
    			input2 = element("input");
    			t15 = text("\n  red");
    			t16 = space();
    			label3 = element("label");
    			input3 = element("input");
    			t17 = text("\n  green");
    			t18 = space();
    			label4 = element("label");
    			input4 = element("input");
    			t19 = text("\n  blue");
    			t20 = space();
    			h12 = element("h1");
    			h12.textContent = "Checkbox groups";
    			t22 = space();
    			p1 = element("p");
    			t23 = text("Active values: ");
    			t24 = text(t24_value);
    			t25 = space();
    			label5 = element("label");
    			input5 = element("input");
    			t26 = text("\n  red");
    			t27 = space();
    			label6 = element("label");
    			input6 = element("input");
    			t28 = text("\n  green");
    			t29 = space();
    			label7 = element("label");
    			input7 = element("input");
    			t30 = text("\n  blue");
    			add_location(h10, file, 8, 0, 143);
    			attr_dev(input0, "type", "checkbox");
    			add_location(input0, file, 14, 2, 255);
    			add_location(code0, file, 16, 2, 341);
    			add_location(label0, file, 13, 0, 245);
    			attr_dev(input1, "type", "checkbox");
    			add_location(input1, file, 20, 2, 418);
    			add_location(code1, file, 22, 2, 502);
    			add_location(label1, file, 19, 0, 408);
    			add_location(h11, file, 25, 0, 573);
    			add_location(p0, file, 27, 0, 590);
    			attr_dev(input2, "type", "radio");
    			input2.__value = "red";
    			input2.value = input2.__value;
    			/*$$binding_groups*/ ctx[7][1].push(input2);
    			add_location(input2, file, 35, 2, 776);
    			add_location(label2, file, 34, 0, 766);
    			attr_dev(input3, "type", "radio");
    			input3.__value = "green";
    			input3.value = input3.__value;
    			/*$$binding_groups*/ ctx[7][1].push(input3);
    			add_location(input3, file, 40, 2, 866);
    			add_location(label3, file, 39, 0, 856);
    			attr_dev(input4, "type", "radio");
    			input4.__value = "blue";
    			input4.value = input4.__value;
    			/*$$binding_groups*/ ctx[7][1].push(input4);
    			add_location(input4, file, 45, 2, 960);
    			add_location(label4, file, 44, 0, 950);
    			add_location(h12, file, 49, 0, 1042);
    			add_location(p1, file, 51, 0, 1068);
    			attr_dev(input5, "type", "checkbox");
    			input5.__value = "red";
    			input5.value = input5.__value;
    			/*$$binding_groups*/ ctx[7][0].push(input5);
    			add_location(input5, file, 59, 2, 1290);
    			add_location(label5, file, 58, 0, 1280);
    			attr_dev(input6, "type", "checkbox");
    			input6.__value = "green";
    			input6.value = input6.__value;
    			/*$$binding_groups*/ ctx[7][0].push(input6);
    			add_location(input6, file, 64, 2, 1387);
    			add_location(label6, file, 63, 0, 1377);
    			attr_dev(input7, "type", "checkbox");
    			input7.__value = "blue";
    			input7.value = input7.__value;
    			/*$$binding_groups*/ ctx[7][0].push(input7);
    			add_location(input7, file, 69, 2, 1488);
    			add_location(label7, file, 68, 0, 1478);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor, remount) {
    			insert_dev(target, h10, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, label0, anchor);
    			append_dev(label0, input0);
    			set_input_value(input0, /*agreedValueBinding*/ ctx[0]);
    			append_dev(label0, t2);
    			append_dev(label0, code0);
    			append_dev(code0, t3);
    			append_dev(code0, t4);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, label1, anchor);
    			append_dev(label1, input1);
    			input1.checked = /*agreedCheckedBinding*/ ctx[1];
    			append_dev(label1, t6);
    			append_dev(label1, code1);
    			append_dev(code1, t7);
    			append_dev(code1, t8);
    			insert_dev(target, t9, anchor);
    			insert_dev(target, h11, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, p0, anchor);
    			append_dev(p0, t12);
    			append_dev(p0, t13);
    			insert_dev(target, t14, anchor);
    			insert_dev(target, label2, anchor);
    			append_dev(label2, input2);
    			input2.checked = input2.__value === /*radioGroupValue*/ ctx[2];
    			append_dev(label2, t15);
    			insert_dev(target, t16, anchor);
    			insert_dev(target, label3, anchor);
    			append_dev(label3, input3);
    			input3.checked = input3.__value === /*radioGroupValue*/ ctx[2];
    			append_dev(label3, t17);
    			insert_dev(target, t18, anchor);
    			insert_dev(target, label4, anchor);
    			append_dev(label4, input4);
    			input4.checked = input4.__value === /*radioGroupValue*/ ctx[2];
    			append_dev(label4, t19);
    			insert_dev(target, t20, anchor);
    			insert_dev(target, h12, anchor);
    			insert_dev(target, t22, anchor);
    			insert_dev(target, p1, anchor);
    			append_dev(p1, t23);
    			append_dev(p1, t24);
    			insert_dev(target, t25, anchor);
    			insert_dev(target, label5, anchor);
    			append_dev(label5, input5);
    			input5.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input5.__value);
    			append_dev(label5, t26);
    			insert_dev(target, t27, anchor);
    			insert_dev(target, label6, anchor);
    			append_dev(label6, input6);
    			input6.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input6.__value);
    			append_dev(label6, t28);
    			insert_dev(target, t29, anchor);
    			insert_dev(target, label7, anchor);
    			append_dev(label7, input7);
    			input7.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input7.__value);
    			append_dev(label7, t30);
    			if (remount) run_all(dispose);

    			dispose = [
    				listen_dev(input0, "change", /*input0_change_handler*/ ctx[4]),
    				listen_dev(input1, "change", /*input1_change_handler*/ ctx[5]),
    				listen_dev(input2, "change", /*input2_change_handler*/ ctx[6]),
    				listen_dev(input3, "change", /*input3_change_handler*/ ctx[8]),
    				listen_dev(input4, "change", /*input4_change_handler*/ ctx[9]),
    				listen_dev(input5, "change", /*input5_change_handler*/ ctx[10]),
    				listen_dev(input6, "change", /*input6_change_handler*/ ctx[11]),
    				listen_dev(input7, "change", /*input7_change_handler*/ ctx[12])
    			];
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*agreedValueBinding*/ 1) {
    				set_input_value(input0, /*agreedValueBinding*/ ctx[0]);
    			}

    			if (dirty & /*agreedValueBinding*/ 1) set_data_dev(t4, /*agreedValueBinding*/ ctx[0]);

    			if (dirty & /*agreedCheckedBinding*/ 2) {
    				input1.checked = /*agreedCheckedBinding*/ ctx[1];
    			}

    			if (dirty & /*agreedCheckedBinding*/ 2) set_data_dev(t8, /*agreedCheckedBinding*/ ctx[1]);
    			if (dirty & /*radioGroupValue*/ 4) set_data_dev(t13, /*radioGroupValue*/ ctx[2]);

    			if (dirty & /*radioGroupValue*/ 4) {
    				input2.checked = input2.__value === /*radioGroupValue*/ ctx[2];
    			}

    			if (dirty & /*radioGroupValue*/ 4) {
    				input3.checked = input3.__value === /*radioGroupValue*/ ctx[2];
    			}

    			if (dirty & /*radioGroupValue*/ 4) {
    				input4.checked = input4.__value === /*radioGroupValue*/ ctx[2];
    			}

    			if (dirty & /*checkboxGroupValues*/ 8 && t24_value !== (t24_value = JSON.stringify(/*checkboxGroupValues*/ ctx[3]) + "")) set_data_dev(t24, t24_value);

    			if (dirty & /*checkboxGroupValues*/ 8) {
    				input5.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input5.__value);
    			}

    			if (dirty & /*checkboxGroupValues*/ 8) {
    				input6.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input6.__value);
    			}

    			if (dirty & /*checkboxGroupValues*/ 8) {
    				input7.checked = ~/*checkboxGroupValues*/ ctx[3].indexOf(input7.__value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h10);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(label0);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(label1);
    			if (detaching) detach_dev(t9);
    			if (detaching) detach_dev(h11);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(p0);
    			if (detaching) detach_dev(t14);
    			if (detaching) detach_dev(label2);
    			/*$$binding_groups*/ ctx[7][1].splice(/*$$binding_groups*/ ctx[7][1].indexOf(input2), 1);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(label3);
    			/*$$binding_groups*/ ctx[7][1].splice(/*$$binding_groups*/ ctx[7][1].indexOf(input3), 1);
    			if (detaching) detach_dev(t18);
    			if (detaching) detach_dev(label4);
    			/*$$binding_groups*/ ctx[7][1].splice(/*$$binding_groups*/ ctx[7][1].indexOf(input4), 1);
    			if (detaching) detach_dev(t20);
    			if (detaching) detach_dev(h12);
    			if (detaching) detach_dev(t22);
    			if (detaching) detach_dev(p1);
    			if (detaching) detach_dev(t25);
    			if (detaching) detach_dev(label5);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input5), 1);
    			if (detaching) detach_dev(t27);
    			if (detaching) detach_dev(label6);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input6), 1);
    			if (detaching) detach_dev(t29);
    			if (detaching) detach_dev(label7);
    			/*$$binding_groups*/ ctx[7][0].splice(/*$$binding_groups*/ ctx[7][0].indexOf(input7), 1);
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let agreedValueBinding;
    	let agreedCheckedBinding;
    	let radioGroupValue = "red";
    	let checkboxGroupValues = ["red"];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);
    	const $$binding_groups = [[], []];

    	function input0_change_handler() {
    		agreedValueBinding = this.value;
    		$$invalidate(0, agreedValueBinding);
    	}

    	function input1_change_handler() {
    		agreedCheckedBinding = this.checked;
    		$$invalidate(1, agreedCheckedBinding);
    	}

    	function input2_change_handler() {
    		radioGroupValue = this.__value;
    		$$invalidate(2, radioGroupValue);
    	}

    	function input3_change_handler() {
    		radioGroupValue = this.__value;
    		$$invalidate(2, radioGroupValue);
    	}

    	function input4_change_handler() {
    		radioGroupValue = this.__value;
    		$$invalidate(2, radioGroupValue);
    	}

    	function input5_change_handler() {
    		checkboxGroupValues = get_binding_group_value($$binding_groups[0]);
    		$$invalidate(3, checkboxGroupValues);
    	}

    	function input6_change_handler() {
    		checkboxGroupValues = get_binding_group_value($$binding_groups[0]);
    		$$invalidate(3, checkboxGroupValues);
    	}

    	function input7_change_handler() {
    		checkboxGroupValues = get_binding_group_value($$binding_groups[0]);
    		$$invalidate(3, checkboxGroupValues);
    	}

    	$$self.$capture_state = () => ({
    		agreedValueBinding,
    		agreedCheckedBinding,
    		radioGroupValue,
    		checkboxGroupValues
    	});

    	$$self.$inject_state = $$props => {
    		if ("agreedValueBinding" in $$props) $$invalidate(0, agreedValueBinding = $$props.agreedValueBinding);
    		if ("agreedCheckedBinding" in $$props) $$invalidate(1, agreedCheckedBinding = $$props.agreedCheckedBinding);
    		if ("radioGroupValue" in $$props) $$invalidate(2, radioGroupValue = $$props.radioGroupValue);
    		if ("checkboxGroupValues" in $$props) $$invalidate(3, checkboxGroupValues = $$props.checkboxGroupValues);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		agreedValueBinding,
    		agreedCheckedBinding,
    		radioGroupValue,
    		checkboxGroupValues,
    		input0_change_handler,
    		input1_change_handler,
    		input2_change_handler,
    		$$binding_groups,
    		input3_change_handler,
    		input4_change_handler,
    		input5_change_handler,
    		input6_change_handler,
    		input7_change_handler
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
