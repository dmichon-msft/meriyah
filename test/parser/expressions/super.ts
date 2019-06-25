import { Context } from '../../../src/common';
import { pass, fail } from '../../test-utils';
import * as t from 'assert';
import { parseSource } from '../../../src/parser';

describe('Expressions - Super', () => {
  for (const arg of ['new super;', 'new super();', '() => new super;', '() => new super();']) {
    it(`class C { method() { ${arg} } }`, () => {
      t.throws(() => {
        parseSource(`class C { method() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { *method() { ${arg} } }`, () => {
      t.throws(() => {
        parseSource(`class C { *method() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { get x() { ${arg} } }`, () => {
      t.throws(() => {
        parseSource(`class C { get x() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { get x() { ${arg} } }`, () => {
      t.throws(() => {
        parseSource(`class C { get x() { ${arg} } }`, undefined, Context.OptionsLexical);
      });
    });

    it(`class C { set x(_) { ${arg} } }`, () => {
      t.throws(() => {
        parseSource(`class C { set x(_) { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`({ method() { ${arg} } })`, () => {
      t.throws(() => {
        parseSource(`({ method() { ${arg} } })`, undefined, Context.None);
      });
    });

    it(`(function() { ${arg} } )`, () => {
      t.throws(() => {
        parseSource(`(function() { ${arg} } )`, undefined, Context.None);
      });
    });

    it(`var f = function() { ${arg} }`, () => {
      t.throws(() => {
        parseSource(`var f = function() { ${arg} }`, undefined, Context.None);
      });
    });

    it(`({ f: function*() {${arg} } })`, () => {
      t.throws(() => {
        parseSource(`({ f: function*() { ${arg} } })`, undefined, Context.None);
      });
    });

    it(`(function*() { ${arg} })`, () => {
      t.throws(() => {
        parseSource(`(function*() { ${arg} })`, undefined, Context.None);
      });
    });

    it(`var f = function*() { ${arg} }`, () => {
      t.throws(() => {
        parseSource(`var f = function*() { ${arg} }`, undefined, Context.None);
      });
    });
  }

  // Testing valid use of super property
  for (const arg of ['new super.x;', 'new super.x();', '() => new super.x;', '() => new super.x();']) {
    it(`class C { constructor() {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { constructor() {${arg}}}`, undefined, Context.None);
      });
    });

    it(`class C { *method() {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { *method() {${arg}}}`, undefined, Context.None);
      });
    });

    it(`({ method() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ method() {${arg}}})`, undefined, Context.None);
      });
    });

    it(`({ *method() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ *method() {${arg}}})`, undefined, Context.None);
      });
    });

    it(`({ get x() {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ get x() {${arg}}})`, undefined, Context.None);
      });
    });

    it(`({ set x(_) {${arg}}})`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ set x(_) {${arg}}})`, undefined, Context.None);
      });
    });

    it(`class C { set x(_) {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { set x(_) {${arg}}}`, undefined, Context.None);
      });
    });

    it(`class C { get x() {${arg}}}`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { get x() {${arg}}}`, undefined, Context.None);
      });
    });
  }

  for (const arg of [
    'super',
    'super = x',
    'y = super',
    'foo(super)',
    'super.x',
    'super[27]',
    'super.x()',
    'super[27]()',
    'super()',
    'new super.x',
    'new super.x()',
    'new super[27]',
    'new super[27]()',
    '() => new super.x;',
    '() => new super.x();'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.None);
      });
    });

    it(`parseSource = ${arg}`, () => {
      t.throws(() => {
        parseSource(`parseSource = ${arg}`, undefined, Context.None);
      });
    });

    it(`foo(${arg})`, () => {
      t.throws(() => {
        parseSource(`foo(${arg})`, undefined, Context.None);
      });
    });

    it(`if (${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`if (${arg}) {}`, undefined, Context.None);
      });
    });

    it(`if (false) {} else {${arg}}`, () => {
      t.throws(() => {
        parseSource(`if (false) {} else {${arg}}`, undefined, Context.None);
      });
    });

    it(`class C { m() { function f() {${arg}} } }`, () => {
      t.throws(() => {
        parseSource(`class C { m() { function f() {${arg}} } }`, undefined, Context.None);
      });
    });

    it(`({ m() { function f() {${arg}} } })`, () => {
      t.throws(() => {
        parseSource(`({ m() { function f() {${arg}} } })`, undefined, Context.None);
      });
    });

    it(`while (true) {${arg}}`, () => {
      t.throws(() => {
        parseSource(`while (true) {${arg}}`, undefined, Context.None);
      });
    });

    it(`class C extends (${arg}) {}`, () => {
      t.throws(() => {
        parseSource(`class C extends (${arg}) {}`, undefined, Context.None);
      });
    });
  }

  for (const arg of [
    'class C { constructor() { super(); } }',
    'class C { method() { super(); } }',
    'class C { method() { () => super(); } }',
    'class C { *method() { super(); } }',
    'class C { get x() { super(); } }',
    'class C { set x(_) { super(); } }',
    '({ method() { super(); } })',
    '({ *method() { super(); } })',
    '({ get x() { super(); } })',
    '({ set x(_) { super(); } })',
    '({ f: function() { super(); } })',
    '(function() { super(); })',
    'var f = function() { super(); }',
    '({ f: function*() { super(); } })',
    '(function*() { super(); })',
    'var f = function*() { super(); }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.None);
      });
    });
  }

  for (const arg of [
    'class a extends b { c() { [super.d] = e } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => super.foo) { return y(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => {return super.foo}) { return y(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => {return () => super.foo}) { return y()(); } }',
    'class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { constructor(x = () => super.foo) { super(); this._x_f = x; } x() { return this._x_f(); } }',
    'class a extends b { constructor(){   class x extends y { [super()](){} }    }}',
    'class a extends b { constructor(){      class x extends super() {}    }}',
    'class a extends b { constructor(){   class x { [super()](){} }    }}',
    'class a extends b { foo(){      class x extends super.foo {}    }}',
    'class a { foo(){      class x extends super.foo {}    }}',
    'class a extends b { foo(){   class x extends y { [super.foo](){} }    }}',
    'class a extends b { foo(){   class x { [super.foo](){} }    }}',
    'class a { foo(){   class x extends y { [super.foo](){} }    }}',
    'class f extends bar { constructor(){  class x { [super()](){} }  }}',
    'class f extends bar { constructor(){  class x extends feh(super()) { }  }}',
    'class f extends bar { constructor(){  class x extends super() { }  }}',
    'class f extends bar { xxx(){  class x { [super.foo](){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f extends bar { xxx(){  class x { foo(x=super.foo){} }  }}',
    'class f extends bar { xxx(){  class x extends feh(super.foo) { }  }}',
    'class f extends bar { xxx(){  class x extends super.foo { }  }}',
    'class f extends bar { constructor(){  class x { [super.foo](){} }  }}',
    'class f extends bar { constructor(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f extends bar { constructor(){  class x { foo(x=super.foo){} }  }}',
    'class f extends bar { constructor(){  class x extends feh(super.foo) { }  }}',
    'class f extends bar { constructor(){  class x extends super.foo { }  }}',
    'class f { bar(){  class x { [super.foo](){} }  }}',
    'class f { bar(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f { bar(){  class x { foo(x=super.foo){} }  }}',
    'class f { bar(){  class x extends feh(super.foo) { }  }}',
    'class f { bar(){  class x extends super.foo { }  }}',
    'class f { constructor(){  class x { [super.foo](){} }  }}',
    'class f { constructor(){  class x { foo(x=new (super.foo)()){} }  }}',
    'class f { constructor(){  class x { foo(x=super.foo){} }  }}',
    'class f { constructor(){  class x extends feh(super.foo) { }  }}',
    'class f { constructor(){  class x extends super.foo { }  }}',
    'class x { foo(x=new (super.foo)()){} }',
    'class x { foo(x=super.foo){} }',
    'class f extends bar { xxx(){  class x { super(){} }  }}',
    'class f extends bar { constructor(){  class x { super(){} }  }}',
    'class f { bar(){  class x { super(){} }  }}',
    'class f { constructor(){  class x { super(){} }  }}',
    'class a { foo(){   class x { [super.foo](){} }    }}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.None);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.OptionsWebCompat);
      });
    });
  }

  for (const arg of [
    'super',
    'super = x',
    'y = super',
    'f(super)',
    'new super',
    'new super()',
    'new super(12, 45)',
    'new new super',
    'new new super()',
    'new new super()()'
  ]) {
    it(`class C { m() { ${arg}; } }`, () => {
      t.throws(() => {
        parseSource(`class C { m() { ${arg}; } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { k = ${arg}; } }`, () => {
      t.throws(() => {
        parseSource(`class C { m() { k = ${arg}; } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { foo(${arg}); } }`, () => {
      t.throws(() => {
        parseSource(`class C { m() { foo(${arg}); } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { () => ${arg}; } }`, () => {
      t.throws(() => {
        parseSource(`class C { m() { () => ${arg}; } }`, undefined, Context.None);
      });
    });
  }

  for (const arg of ['new super.x;', 'new super.x();', '() => new super.x;', '() => new super.x();']) {
    it(`class C { constructor() { ${arg} } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { constructor() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { *method() { ${arg} } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { *method() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { get x() { ${arg} } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { get x() { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`class C { set x(_) { ${arg} } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { set x(_) { ${arg} } }`, undefined, Context.None);
      });
    });

    it(`({ method() { ${arg} } })`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ method() { ${arg} } })`, undefined, Context.None);
      });
    });

    it(`({ *method() { ${arg} } })`, () => {
      t.doesNotThrow(() => {
        parseSource(`({ *method() { ${arg} } })`, undefined, Context.None);
      });
    });

    it(`(class C { get x() { ${arg} } })`, () => {
      t.doesNotThrow(() => {
        parseSource(`(class C { get x() { ${arg} } })`, undefined, Context.None);
      });
    });

    it(`(class C { set x(_) { ${arg} } })`, () => {
      t.doesNotThrow(() => {
        parseSource(`(class C { set x(_) { ${arg} } })`, undefined, Context.None);
      });
    });
  }

  for (const arg of [
    'super.x',
    'super[27]',
    'new super.x',
    'new super.x()',
    'new super[27]',
    'new super[27]()',
    'z.super'
  ]) {
    it(`class C { m() { ${arg}; } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { m() { ${arg}; } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { k = ${arg}; } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { m() { k = ${arg}; } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { foo(${arg}); } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { m() { foo(${arg}); } }`, undefined, Context.None);
      });
    });

    it(`class C { m() { () => ${arg}; } }`, () => {
      t.doesNotThrow(() => {
        parseSource(`class C { m() { () => ${arg}; } }`, undefined, Context.None);
      });
    });
  }

  fail('Expressions - Super (fail)', [
    ['super', Context.None],
    ['super[]', Context.None],
    ['super()', Context.None],
    ['async function* x() { super(); }', Context.None],
    ['ref = async function*() { super(); }', Context.None],
    ['(async function*() { super(); })', Context.None],
    ['var gen = { async *method() { super(); } }', Context.None],
    ['var C = class { async *method() { super(); } }', Context.None],
    ['var C = class { static async *method() { var x = function () { super(); } } }', Context.None],
    ['async function* x() { var x = { y: function () { super(); } } }', Context.None],
    ['var gen = { async *method() { var x = { y: function () { super(); } } } }', Context.None],
    ['var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.None],
    ['var C = class { static async *method() { var x = { y: function () { super(); } } } }', Context.None],
    ['let f = (a=super.foo) => a;', Context.None],
    ['let f = () => super.foo;', Context.None],
    ['x={ foo(){ return () => () => super(); }}', Context.None],
    ['x={ dsda(){ return (a=super()) => a; }}', Context.None],
    ['x={ fo(){ return () => super(); }}', Context.None],
    ['class x extends y { foo(){ return () => () => super(); }}', Context.None],
    ['class x extends y { dsda(){ return (a=super()) => a; }}', Context.None],
    ['class x extends y { fo(){ return () => super(); }}', Context.None],
    ['class x { constructor(){ return () => () => super(); }}', Context.None],
    ['let f = (a=super()) => a;', Context.None],
    ['let f = () => super();', Context.None],
    ['var foo = function*(a = 1 + (yield 2)) { super.foo() ', Context.None],
    ['function* foo(a = 1 + (yield 2)) { super.foo() }', Context.None],
    ['function x(){function x(){super();}}', Context.None],
    ['class A extends B { *g2(a = 1 + (yield 2)) { } }', Context.None],
    ['class x { foo(){ function f(){ super.foo; } }}', Context.None],
    ['class x { constructor(){ function f(){ super.foo; } }}', Context.None],
    ['x = function(){ super.foo; }', Context.None],
    ['super.foo;', Context.None],
    ['function f(x=super.foo){ }', Context.None],
    ['function f(){ super.foo; }', Context.None],
    ['class super { }', Context.None],
    ['class x extends super { }', Context.None],
    ['class x extends super y { }', Context.None],
    ['class x extends foo(super) { }', Context.None],
    ['class x extends foo(super y) { }', Context.None],
    ['class x { foo(super){} }', Context.None],
    ['class x { foo(x=super){} }', Context.None],
    ['class x { foo(x=super y){} }', Context.None],
    ['class x { foo(x=new (super)()){} }', Context.None],
    ['class x { [super](){} }', Context.None],
    ['class x { [super y](){} }', Context.None],
    ['class f { constructor(){  class super { }  }}', Context.None],
    ['class f { constructor(){  class x extends super { }  }}', Context.None],
    ['class f { constructor(){  class x extends super y { }  }}', Context.None],
    ['class f { constructor(){  class x extends feh(super) { }  }}', Context.None],
    ['class f { constructor(){  class x extends feh(super y) { }  }}', Context.None],
    ['class f { constructor(){  class x { foo(super){} }  }}', Context.None],
    ['class f { constructor(){  class x { foo(x=super){} }  }}', Context.None],
    ['class f { constructor(){  class x { foo(x=super y){} }  }}', Context.None],
    ['class f { constructor(){  class x { foo(x=new (super)()){} }  }}', Context.None],
    ['class f { constructor(){  class x { [super](){} }  }}', Context.None],
    ['class f { constructor(){  class x { [super y](){} }  }}', Context.None],
    ['class f { bar(){ class super {} }}', Context.None],
    ['class f { bar(){ class x extends super { }  }}', Context.None],
    ['class f { bar(){ class x extends super y { }  }}', Context.None],
    ['class f { bar(){ class x extends feh(super) { }  }}', Context.None],
    ['class f { bar(){ class x extends feh(super y) { }  }}', Context.None],
    ['class f { bar(){ class x { foo(super){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=super){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=super y){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=new (super)()){} }  }}', Context.None],
    ['class f { bar(){ class x { [super](){} }  }}', Context.None],
    ['class f { bar(){ class x { [super y](){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class super { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends super { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends super y { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends feh(super) { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends feh(super y) { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(super){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(x=super){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(x=super y){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(x=new (super)()){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { [super](){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { [super y](){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class super {} }}', Context.None],
    ['class f extends bar { xxx(){ class x extends super { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends super y { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends feh(super) { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends feh(super y) { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(super){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=super){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=super y){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=new (super)()){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { [super](){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { [super y](){} }  }}', Context.None],
    ['class super.foo { }', Context.None],
    ['class x extends super.foo { }', Context.None],
    ['class x extends super.foo y { }', Context.None],
    ['class x extends feh(super.foo) { }', Context.None],
    ['class x extends feh(super.foo y) { }', Context.None],
    ['class x { foo(super.foo){} }', Context.None],
    ['class x { super.foo(){} }', Context.None],
    ['class x { [super.foo](){} }', Context.None],
    ['class x { [super.foo y](){} }', Context.None],
    ['class f { constructor(){ class super.foo { }  }}', Context.None],
    ['class f { constructor(){ class x extends super.foo y { }  }}', Context.None],
    ['class f { constructor(){ class x extends feh(super.foo y) { }  }}', Context.None],
    ['class f { constructor(){ class x { foo(super.foo){} }  }}', Context.None],
    ['x={ foo: function(){ super.foo; }}', Context.None],
    ['g=function f(x = super()){ }', Context.None],
    ['g={f: function f(){ super() }]', Context.None],
    ['x={constructor(){ super(); }}', Context.None],
    ['function f(x = super()){ }', Context.None],
    ['function f(){ super(); }', Context.None],
    ['const x = 5 + super();', Context.None],
    ['let x = { foo(){ super(); } }', Context.None],
    ['class x { foo(){ super(); } }', Context.None],
    ['class x extends y { foo(){ super(); } }', Context.None],
    ['async(foo) => { super.prop };', Context.None],
    ['!{ a() { !function* (a = super.b()){} } };', Context.None],
    ['async(foo) => { super() };', Context.None],
    ['super.property;', Context.None],
    ['(async function*() { super(); });', Context.None],
    ['function* a(b){ super.c }', Context.None],
    ['class A extends B { constructor() { (super)() } }', Context.None],
    ['function wrap() { function foo(a = super(), b = super.foo()) {}}', Context.None],
    ['({ a() { (super).b(); } });', Context.None],
    ['class X { x(){class X { constructor(){super();} }} }', Context.None],
    ['!{ a() { !function* (a = super.b()){} } };', Context.None],
    ['({ f: function*() {() => new super; } })', Context.None],
    ['async function* x() { super(); }', Context.None],
    ['var C = class { static async *method() { var x = function () { super(); } } }', Context.None],
    ['var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.None],
    ['let x = { foo(){ super(); } }', Context.None],
    ['function* a(b){ super.c }', Context.None],
    ['class C { constructor() { super(); } }', Context.None],
    ['class C { method() { () => super(); } }', Context.None],
    ['({ get x() { super(); } })', Context.None],
    ['({ set x(_) { super(); } })', Context.None],
    ['({ f: function() { super(); } })', Context.None],
    ['(function() { super(); })', Context.None],
    ['({ f: function*() { super(); } })', Context.None],
    ['(function*() { super(); })', Context.None],
    ['var f = function*() { super(); }', Context.None],
    ['class f { constructor(){ class x { foo(x=super.foo y){} } }}', Context.None],
    ['class f { constructor(){ class x { super.foo(){} } }}', Context.None],
    ['class f { constructor(){ class x { [super.foo y](){} } }}', Context.None],
    ['class f { bar(){ class super.foo { } }}', Context.None],
    ['class f { bar(){ class x extends super.foo y {} }}', Context.None],
    ['class f { bar(){ class x extends feh(super.foo y) {} }}', Context.None],
    ['class f { bar(){ class x { foo(super.foo){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=super.foo y){} }  }}', Context.None],
    ['class f { bar(){ class x { super.foo(){} }  }}', Context.None],
    ['class f { bar(){ class x { [super.foo y](){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class super.foo { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends super.foo y { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x extends feh(super.foo y) { }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(super.foo){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(x=super.foo y){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { super.foo(){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class x { [super.foo y](){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class super.foo { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends super.foo y { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends feh(super.foo y) { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=super.foo y){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { super.foo(){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { [super.foo y](){} }  }}', Context.None],
    ['class x extends super() { }', Context.None],
    ['class x { foo(x=new (super)()){} }', Context.None],
    ['class x extends super() y { }', Context.None],
    ['class x extends feh(super()) { }', Context.None],
    ['class x extends feh(super() y) { }', Context.None],
    ['class x { foo(super()){} }', Context.None],
    ['class x { foo(x=super()){} }', Context.None],
    ['class x { foo(x=super() y){} }', Context.None],
    ['class x { foo(x=new (super())()){} }', Context.None],
    ['class x { super()(){} }', Context.None],
    ['class x { [super()](){} }', Context.None],
    ['class x { [super() y](){} }', Context.None],
    ['class f { constructor(){ class super() { } }}', Context.None],
    ['class f { constructor(){ class x extends super() {} }}', Context.None],
    ['class f { constructor(){ class x extends super() y {} }}', Context.None],
    ['class f { constructor(){ class x { foo(super()){} } }}', Context.None],
    ['class f { constructor(){ class x { foo(x=super()){} } }}', Context.None],
    ['class f { constructor(){ class x { foo(x=super() y){} } }}', Context.None],
    ['class f { constructor(){ class x { foo(x=new (super())()){} } }}', Context.None],
    ['class f { constructor(){ class x { super()(){} } }}', Context.None],
    ['class f { constructor(){ class x { [super()](){} } }}', Context.None],
    ['class f { constructor(){ class x { [super() y](){} } }}', Context.None],
    ['class f { bar(){ class super() {}  }}', Context.None],
    ['class f { bar(){ class x extends super() {} }}', Context.None],
    ['class f { bar(){ class x extends super() y {} }}', Context.None],
    ['class f { bar(){ class x extends feh(super()) {} }}', Context.None],
    ['class f { bar(){ class x extends feh(super() y) {} }}', Context.None],
    ['class f { bar(){ class x { foo(super()){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=super()){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=super() y){} }  }}', Context.None],
    ['class f { bar(){ class x { foo(x=new (super())()){} } }}', Context.None],
    ['class f { bar(){ class x { [super()](){} }  }}', Context.None],
    ['class f extends bar { constructor(){ class super() {} }}', Context.None],
    ['class f extends bar { constructor(){ class x extends super() y {} }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(super()){} } }}', Context.None],
    ['class f extends bar { constructor(){ class x { foo(x=super()){} } }}', Context.None],
    ['class f extends bar { constructor(){ class x { super()(){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class super() {} }}', Context.None],
    ['class f extends bar { xxx(){ class x extends super() { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends super() y { }  }}', Context.None],
    ['class f extends bar { xxx(){ class x extends feh(super()) {} }}', Context.None],
    ['class f extends bar { xxx(){ class x extends feh(super() y) { } }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(super()){} }  }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=super() y){} } }}', Context.None],
    ['class f extends bar { xxx(){ class x { foo(x=new (super())()){} } }}', Context.None],
    ['class f extends bar { xxx(){ class x { super()(){} } }}', Context.None],
    ['class f extends bar { xxx(){ class x { [super()](){} } }}', Context.None],
    ['class f extends bar { xxx(){ class x { [super() y](){} } }}', Context.None],
    ['super', Context.None],
    ['super[]', Context.None],
    ['super()', Context.None]
  ]);

  pass('Expressions - Super (pass)', [
    [
      'class C { constructor() {new super.x; } }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 41,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 41,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'C'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              start: 8,
              end: 41,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 10,
                  end: 39,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 10,
                    end: 21,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 21,
                    end: 39,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 24,
                      end: 39,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 25,
                          end: 37,
                          expression: {
                            type: 'NewExpression',
                            start: 25,
                            end: 36,
                            callee: {
                              type: 'MemberExpression',
                              start: 29,
                              end: 36,
                              object: {
                                type: 'Super',
                                start: 29,
                                end: 34
                              },
                              property: {
                                type: 'Identifier',
                                start: 35,
                                end: 36,
                                name: 'x'
                              },
                              computed: false
                            },
                            arguments: []
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 21,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 21,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 21,
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { f(){} }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 27,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 27,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 27,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 20,
                  end: 25,
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 21,
                    name: 'f'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 21,
                    end: 25,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 23,
                      end: 25,
                      body: []
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { constructor() { super(); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { constructor(){ super.foo; }}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 38,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 38,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              start: 8,
              end: 38,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 10,
                  end: 37,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 10,
                    end: 21,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 21,
                    end: 37,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 23,
                      end: 37,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 25,
                          end: 35,
                          expression: {
                            type: 'MemberExpression',
                            start: 25,
                            end: 34,
                            object: {
                              type: 'Super',
                              start: 25,
                              end: 30
                            },
                            property: {
                              type: 'Identifier',
                              start: 31,
                              end: 34,
                              name: 'foo'
                            },
                            computed: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x { foo(){ super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { foo(x=super.foo){ }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: false,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'x={ foo(){ super.foo; }}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 24,
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 24,
            expression: {
              type: 'AssignmentExpression',
              start: 0,
              end: 24,
              operator: '=',
              left: {
                type: 'Identifier',
                start: 0,
                end: 1,
                name: 'x'
              },
              right: {
                type: 'ObjectExpression',
                start: 2,
                end: 24,
                properties: [
                  {
                    type: 'Property',
                    start: 4,
                    end: 23,
                    method: true,
                    shorthand: false,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 4,
                      end: 7,
                      name: 'foo'
                    },
                    kind: 'init',
                    value: {
                      type: 'FunctionExpression',
                      start: 7,
                      end: 23,
                      id: null,
                      generator: false,
                      async: false,
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        start: 9,
                        end: 23,
                        body: [
                          {
                            type: 'ExpressionStatement',
                            start: 11,
                            end: 21,
                            expression: {
                              type: 'MemberExpression',
                              start: 11,
                              end: 20,
                              object: {
                                type: 'Super',
                                start: 11,
                                end: 16
                              },
                              property: {
                                type: 'Identifier',
                                start: 17,
                                end: 20,
                                name: 'foo'
                              },
                              computed: false
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'x={ foo(a = super.foo){ }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          right: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,

                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'class x { constructor(){ super[foo]; }}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 39,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 39,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              start: 8,
              end: 39,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 10,
                  end: 38,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 10,
                    end: 21,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 21,
                    end: 38,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 23,
                      end: 38,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 25,
                          end: 36,
                          expression: {
                            type: 'MemberExpression',
                            start: 25,
                            end: 35,
                            object: {
                              type: 'Super',
                              start: 25,
                              end: 30
                            },
                            property: {
                              type: 'Identifier',
                              start: 31,
                              end: 34,
                              name: 'foo'
                            },
                            computed: true
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x { foo(){ super[foo]; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: true,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { foo(x=super[foo]){ }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Super'
                          },
                          computed: true,
                          property: {
                            type: 'Identifier',
                            name: 'foo'
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'x={ foo(){ super[foo]; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: true,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: false,

                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'x={ foo(a = super[foo]){ }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'a'
                          },
                          right: {
                            type: 'MemberExpression',
                            object: {
                              type: 'Super'
                            },
                            computed: true,
                            property: {
                              type: 'Identifier',
                              name: 'foo'
                            }
                          }
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: []
                      },
                      async: false,
                      generator: false,

                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return () => super(); }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'CallExpression',
                              callee: {
                                type: 'Super'
                              },
                              arguments: []
                            },
                            params: [],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return (a=super()) => a; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a'
                                },
                                right: {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'Super'
                                  },
                                  arguments: []
                                }
                              }
                            ],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return () => () => super(); }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Super'
                                },
                                arguments: []
                              },
                              params: [],

                              async: false,
                              expression: true
                            },
                            params: [],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return () => super[foo]; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: true,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,

                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { constructor(){ return () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return (a=super.foo) => a; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a'
                                },
                                right: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Super'
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo'
                                  }
                                }
                              }
                            ],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(){ return (a=super.foo) => a; }}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 64,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 64,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 64,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 20,
                  end: 63,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 31,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 31,
                    end: 63,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 33,
                      end: 63,
                      body: [
                        {
                          type: 'ReturnStatement',
                          start: 35,
                          end: 61,
                          argument: {
                            type: 'ArrowFunctionExpression',
                            start: 42,
                            end: 60,
                            expression: true,
                            async: false,
                            params: [
                              {
                                type: 'AssignmentPattern',
                                start: 43,
                                end: 54,
                                left: {
                                  type: 'Identifier',
                                  start: 43,
                                  end: 44,
                                  name: 'a'
                                },
                                right: {
                                  type: 'MemberExpression',
                                  start: 45,
                                  end: 54,
                                  object: {
                                    type: 'Super',
                                    start: 45,
                                    end: 50
                                  },
                                  property: {
                                    type: 'Identifier',
                                    start: 51,
                                    end: 54,
                                    name: 'foo'
                                  },
                                  computed: false
                                }
                              }
                            ],
                            body: {
                              type: 'Identifier',
                              start: 59,
                              end: 60,
                              name: 'a'
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { constructor(){ return () => () => super.foo; }}',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 67,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 67,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 67,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 20,
                  end: 66,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 31,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 31,
                    end: 66,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 33,
                      end: 66,
                      body: [
                        {
                          type: 'ReturnStatement',
                          start: 35,
                          end: 64,
                          argument: {
                            type: 'ArrowFunctionExpression',
                            start: 42,
                            end: 63,
                            expression: true,
                            async: false,
                            params: [],
                            body: {
                              type: 'ArrowFunctionExpression',
                              start: 48,
                              end: 63,
                              expression: true,
                              async: false,
                              params: [],
                              body: {
                                type: 'MemberExpression',
                                start: 54,
                                end: 63,
                                object: {
                                  type: 'Super',
                                  start: 54,
                                  end: 59
                                },
                                property: {
                                  type: 'Identifier',
                                  start: 60,
                                  end: 63,
                                  name: 'foo'
                                },
                                computed: false
                              }
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x { constructor(){ return () => () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              },
                              params: [],

                              async: false,
                              expression: true
                            },
                            params: [],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { fo(){ return () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'fo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'foo'
                              }
                            },
                            params: [],

                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { dsda(){ return (a=super.foo) => a; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'dsda'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a'
                                },
                                right: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Super'
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo'
                                  }
                                }
                              }
                            ],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x { dsda(){ return (a=super.foo) => a; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'dsda'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a'
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a'
                                },
                                right: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Super'
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo'
                                  }
                                }
                              }
                            ],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { foo(){ return () => () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              },
                              params: [],

                              async: false,
                              expression: true
                            },
                            params: [],
                            async: false,
                            expression: true
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'x={ fo(){ return () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'fo'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              },
                              params: [],

                              async: false,
                              expression: true
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: false,
                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'x={ dsda(){ return (a=super.foo) => a; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'dsda'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'Identifier',
                                name: 'a'
                              },
                              params: [
                                {
                                  type: 'AssignmentPattern',
                                  left: {
                                    type: 'Identifier',
                                    name: 'a'
                                  },
                                  right: {
                                    type: 'MemberExpression',
                                    object: {
                                      type: 'Super'
                                    },
                                    computed: false,
                                    property: {
                                      type: 'Identifier',
                                      name: 'foo'
                                    }
                                  }
                                }
                              ],
                              async: false,
                              expression: true
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: false,
                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'x={ foo(){ return () => () => super.foo; }}',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'x'
              },
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo'
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'ArrowFunctionExpression',
                                body: {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Super'
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo'
                                  }
                                },
                                params: [],
                                async: false,
                                expression: true
                              },
                              params: [],
                              async: false,
                              expression: true
                            }
                          }
                        ]
                      },
                      async: false,
                      generator: false,
                      id: null
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false
                  }
                ]
              }
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor() { } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor() { log(this); super(); } }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 59,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 59,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 59,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 20,
                  end: 57,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 31,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 31,
                    end: 57,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 34,
                      end: 57,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 36,
                          end: 46,
                          expression: {
                            type: 'CallExpression',
                            start: 36,
                            end: 45,
                            callee: {
                              type: 'Identifier',
                              start: 36,
                              end: 39,
                              name: 'log'
                            },
                            arguments: [
                              {
                                type: 'ThisExpression',
                                start: 40,
                                end: 44
                              }
                            ]
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 47,
                          end: 55,
                          expression: {
                            type: 'CallExpression',
                            start: 47,
                            end: 54,
                            callee: {
                              type: 'Super',
                              start: 47,
                              end: 52
                            },
                            arguments: []
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { constructor() { log(super.foo); super(); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'log'
                            },
                            arguments: [
                              {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Super'
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo'
                                }
                              }
                            ]
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(x = super()) { } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(x = this) { super(); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'ThisExpression'
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor(x = super(), y = this) { } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x'
                        },
                        right: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Super'
                          },
                          arguments: []
                        }
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'y'
                        },
                        right: {
                          type: 'ThisExpression'
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: []
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor() { super(); super(); } }',
      Context.OptionsRanges,
      {
        type: 'Program',
        start: 0,
        end: 57,
        body: [
          {
            type: 'ClassDeclaration',
            start: 0,
            end: 57,
            id: {
              type: 'Identifier',
              start: 6,
              end: 7,
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              start: 16,
              end: 17,
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              start: 18,
              end: 57,
              body: [
                {
                  type: 'MethodDefinition',
                  start: 20,
                  end: 55,
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 20,
                    end: 31,
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 31,
                    end: 55,
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 34,
                      end: 55,
                      body: [
                        {
                          type: 'ExpressionStatement',
                          start: 36,
                          end: 44,
                          expression: {
                            type: 'CallExpression',
                            start: 36,
                            end: 43,
                            callee: {
                              type: 'Super',
                              start: 36,
                              end: 41
                            },
                            arguments: []
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          start: 45,
                          end: 53,
                          expression: {
                            type: 'CallExpression',
                            start: 45,
                            end: 52,
                            callee: {
                              type: 'Super',
                              start: 45,
                              end: 50
                            },
                            arguments: []
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'class x extends y { constructor() { super(this); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: [
                              {
                                type: 'ThisExpression'
                              }
                            ]
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor() { let xx = x + x; super(); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'VariableDeclaration',
                          kind: 'let',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              init: {
                                type: 'BinaryExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                right: {
                                  type: 'Identifier',
                                  name: 'x'
                                },
                                operator: '+'
                              },
                              id: {
                                type: 'Identifier',
                                name: 'xx'
                              }
                            }
                          ]
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      'class x extends y { constructor() { f(x); super(); } }',
      Context.None,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'x'
            },
            superClass: {
              type: 'Identifier',
              name: 'y'
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'f'
                            },
                            arguments: [
                              {
                                type: 'Identifier',
                                name: 'x'
                              }
                            ]
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super'
                            },
                            arguments: []
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ]
  ]);
});
