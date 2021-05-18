"use strict";
var form_mixin = {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: (_props = {
    // 宽度
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    },
    // 类型
    type: {
      type: String,
      default: 'text'
    },
    // 选项
    options: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    // 赋值
    value: {
      type: [String, Number, Boolean]
    },
    // 回调函数
    func: {
      type: Function,
      default: function _default(fun, param1, param2) {
        return null;
      }
    },
    // 显示方式
    display: {
      type: String,
      default: "1"
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 图标
    icon: {
      type: String,
      default: ''
    },
    // 单位
    unit: {
      type: String,
      default: ''
    },
    // 描述
    desc: {
      type: String,
      default: ""
    },
    // 错误提示
    tip: {
      type: String,
      default: ""
    },
    // 最小值
    min: {
      type: Number,
      default: 0
    },
    // 最大值
    max: {
      type: Number,
      default: 0
    },
    // 最小长度
    min_length: {
      type: Number,
      default: 0
    },
    // 最大长度
    max_length: {
      type: Number,
      default: 65535
    },
    // 主键
    field: {
      type: String,
      default: "value"
    }
  }, _defineProperty(_props, "type", {
    type: String,
    default: "text"
  }), _defineProperty(_props, "num", {
    type: Number,
    default: 1
  }), _defineProperty(_props, "text", {
    type: String,
    default: ""
  }), _defineProperty(_props, "disabled", {
    type: Boolean,
    default: false
  }), _defineProperty(_props, "url", {
    type: String,
    default: ""
  }), _defineProperty(_props, "user_group", {
    type: Array,
    default: function _default() {
      return [];
    }
  }), _defineProperty(_props, "user_admin", {
    type: Array,
    default: function _default() {
      return [];
    }
  }), _defineProperty(_props, "vip", {
    type: Number,
    default: 0
  }), _defineProperty(_props, "gm", {
    type: Number,
    default: 0
  }), _defineProperty(_props, "oauth", {
    type: Boolean,
    default: false
  }), _props),
  data: function data() {
    return {
      // 显示方式
      dy: this.display,
      // 显示隐藏
      sw: this.show,
      // 加载中
      load: this.loading,
      // 列表
      oj: this.obj,
      // 数量
      nm: this.num,
      // 文本
      txt: this.text,
      // 值
      val: this.value,
      // 禁用
      dd: this.disabled
    };
  },
  methods: {
    /// 可更改其他属性，默认绑定回调函数
    /// fun: 函数名
    /// param1: 参数1
    /// param2: 参数2
    /// param3: 参数3
    run: function run(fun, param1, param2, param3) {
      if (this.func) {
        return this.func(param1, param2, param3);
      }

      return null;
    },
    // 删除
    /// query: 查询条件
    del: function del() {
      var query = {};
      query[this.field] = this.id;
      this.run('del', query);
    },
    // 修改
    /// query: 查询条件
    /// obj: 修改的对象
    set: function set(obj) {
      var query = {};
      query[this.field] = this.id;
      this.run('set', query, obj);
    }
  }
};
var mm_btn = {
  template: "<button :type=\"type\" class=\"mm_btn\" v-if=\"!url\" @click=\"click_down()\"><slot></slot></button><button class=\"mm_btn\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></button><router-link class=\"mm_btn\" :to=\"url\" v-else><slot></slot></router-link>",
  props: {
    url: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    func: {
      type: Function,
      default: function _default() {}
    }
  },
  methods: {
    openBrowser: function openBrowser() {
      if (window) {
        window.open(this.url);
      }
    },
    click_down: function click_down() {
      if (this.func) {
        this.func();
      }
    }
  }
};
var mm_icon = {
  template: "<div class=\"mm_icon\" v-if=\"src && src.indexOf('<') !== -1\" v-html=\"src\"></div><div class=\"mm_icon\" v-else-if=\"src\" :style=\"'background-image: url(' + src + ');'\"><img class=\"img\" :src=\"src\" :alt=\"alt\" :onerror=\"onerror\" /><figcaption v-if=\"$slots.default\"><slot></slot></figcaption></div><div class=\"mm_icon\" v-else></div>",
  props: {
    src: {
      type: String,
      default: ""
    },
    src_default: {
      type: String,
      default: "/img/default.png"
    },
    height: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: "图片"
    }
  },
  computed: {
    onerror: function() {
      return "javascript:this.src='" + this.src_default + "'";
    }
  }
};
var mm_loading = {
  template: "<div class=\"mm_loading\"><div class=\"load\"><slot><img src=\"/img/loading.svg\" :style=\"'width:' + wh + ';height:' + ht\" v-if=\"display == '1'\" /><div class=\"progress\" :style=\"'width:' + wh + ';height:' + ht\" v-else></div></slot></div><div class=\"state\">{{ title }}<span class=\"value\" v-show=\"value\"> {{ value }}</span></div></div>",
  props: {
    value: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: "加载中"
    },
    width: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: ""
    },
    display: {
      type: String,
      default: "1"
    }
  },
  data: function data() {
    var wh = "";
    var ht = "";

    if (this.width) {
      wh = this.width;
    } else {
      if (this.display === "1") {
        wh = "1.5rem";
      } else if (this.display === "2") {
        wh = "100%";
      }
    }

    if (this.height) {
      wh = this.height;
    } else {
      if (this.display === "1") {
        ht = "auto";
      } else if (this.display === "2") {
        ht = "4px";
      }
    }

    return {
      ht: ht,
      wh: wh
    };
  }
};
var mm_body = {
  template: "<div class=\"mm_body\"><slot></slot></div>"
};
var mm_col = {
  template: "<div :class=\"'mm_col' + this.wh\"><slot></slot></div>",
  props: {
    width: {
      type: String,
      default: ""
    }
  },
  data: function data() {
    return {
      wh: this.width
    };
  },
  created: function created() {
    var wh = this.wh;
    if (wh) {
      if (wh.indexOf("-") == -1) {
        this.wh = " w-" + wh;
      }
    }
  }
};
var mm_foot = {
  template: "<footer class=\"mm_foot\"><slot></slot></footer>"
};
var mm_row = {
  template: "<div :class=\"'mm_row' + cl\"><slot></slot></div>",
  props: {
    col: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cl: function cl() {
      var cl = this.col;

      if (cl && cl.indexOf("-") == -1) {
        cl = " row-" + cl;
      }

      return cl;
    }
  }
};
var mm_grid = {
  template: "<div :class=\"'mm_grid' + cl\"><slot></slot></div>",
  props: {
    col: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cl: function cl() {
      var cl = this.col;

      if (cl && cl.indexOf("-") == -1) {
        cl = " grid-" + cl;
      }

      return cl;
    }
  }
};
var mm_group = {
  template: "<div class=\"mm_group\"><slot></slot></div>"
};
var mm_head = {
  template: "<div class=\"mm_head\"><slot></slot></div>"
};
var mm_item = {
  template: "<div class=\"mm_item\" v-if=\"!url\"><slot></slot></div><div class=\"mm_item\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></div><router-link class=\"mm_item\" :to=\"url\" v-else><slot></slot></router-link>",
  props: {
    url: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    }
  },
  methods: {
    openBrowser: function openBrowser() {
      if (window) {
        window.open(this.url);
      }
    }
  }
};
var mm_list = {
  template: "<div :class=\"'mm_list' + cl\"><slot></slot></div>",
  props: {
    col: {
      type: Number,
      default: 0
    }
  },
  computed: {
    cl: function cl() {
      var cl = this.col;

      if (cl) {
        return " list-" + cl;
      }

      return "";
    }
  }
};
var mm_main = {
  template: "<div class=\"mm_main\"><slot></slot></div>"
};
var mm_modal = {
  template: "<div class=\"mm_modal\" v-bind:class=\"{ 'show' : show }\"><div v-bind:class=\"'from_' + display\"><slot></slot></div><div class=\"mask\" v-if=\"mask && mask != 'false'\" @click=\"close()\"></div></div>",
  props: {
    display: {
      type: String,
      default: "default"
    },
    show: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ""
    }
  },
  model: {
    prop: "show",
    event: "input"
  },
  methods: {
    close: function close() {
      this.$emit("input", false);
    }
  }
};
var mm_movable = {
  template: "<div class=\"mm_movable\"><slot></slot></div>"
};
var mm_page = {
  template: "<div class=\"mm_page\"><slot></slot></div>",
  props: {
    fun: {
      type: Function,
      default: function _default() {}
    }
  }
};
var mm_view = {
  template: "<div class=\"mm_view\" v-if=\"!url\"><slot></slot></div><div class=\"mm_view\" @click=\"openBrowser()\" v-else-if=\"url.indexOf('http:') === 0 || url.indexOf('https:') === 0\"><slot></slot></div><router-link class=\"mm_view\" :to=\"url\" v-else><slot></slot></router-link>",
  props: {
    url: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    }
  },
  methods: {
    openBrowser: function openBrowser() {
      if (window) {
        window.open(this.url);
      }
    }
  }
};
var mm_card = {
  template: "<div class=\"mm_card\"><slot></slot></div>",
  props: {
    fun: {
      type: Function,
      default: function _default() {}
    }
  }
};

function bindResize(tag, target, func) {
  var width_init = $(target).width();
  var el = $(tag);
  var x = 0;
  var y = 0;
  el.mousedown(function(e) {
    x = e.clientX - el.offset().left;
    el.setCapture ? (el.setCapture(), el.onmousemove = function(ev) {
      mouseMove(ev || event);
    }, el.onmouseup = mouseUp) : $(document).bind("mousemove", mouseMove).bind("mouseup", mouseUp);
    e.preventDefault();
  });

  function mouseMove(e) {
    var width = e.clientX - x;

    if (width >= width_init) {
      $(target).width(width + "px");

      if (func) {
        func(width);
      }
    }
  }

  function mouseUp() {
    el.releaseCapture ? (el.releaseCapture(), el.onmousemove = el.onmouseup = null) : $(document).unbind("mousemove",
      mouseMove).unbind("mouseup", mouseUp);
  }
}

var mm_side = {
  template: "<div class=\"mm_side\" :class=\"{'hide-x': hide, fold: fold}\" :id=\"side_id\"><slot></slot><div class=\"line\"></div><div class=\"mask\" @click=\"set_hide()\"></div></div>",
  model: {
    prop: "hide",
    event: "change"
  },
  props: {
    id: {
      type: String,
      default: ""
    },
    hide: {
      type: Boolean,
      default: false
    },
    fold: {
      type: Boolean,
      default: false
    },
    func: {
      type: Function,
      default: function _default(width) {}
    }
  },
  data: function data() {
    var id = this.id;

    if (!id) {
      id = "mm_side" + parseInt(Math.random() * 1000 + 1, 10);
    }

    return {
      side_id: id
    };
  },
  methods: {
    set_hide: function set_hide() {
      this.$emit('change', true);
    }
  },
  mounted: function mounted() {
    var target = "#" + this.side_id;
    bindResize(target + " .line", target, this.func);
  }
};

var mm_nav_top = {
  template: "<div class=\"mm_nav_top\" :class=\"{show: show}\"><button class=\"btn_link\" @click=\"$emit('change', !show)\"><i class=\"fa fa-bars\"></i></button><div class=\"nav_warp\"><div class=\"nav\"><slot></slot></div><div class=\"mask\" @click=\"$emit('change', false)\"></div></div></div>",
  model: {
    prop: 'show',
    event: 'change'
  },
  props: {
    show: {
      type: Boolean,
      show: false
    }
  },
  data: function() {
    return {}
  }
};

var mm_table = {
  template: "<div :class=\"'mm_table table-' + type\"><table><slot></slot></table></div>",
  props: {
    type: {
      type: String,
      default: "1"
    }
  }
};

var mm_warp = {
  template: "<div class=\"mm_warp\"><slot></slot></div>"
};
var mm_container = {
  template: "<div class=\"mm_container\"><slot></slot></div>"
};

var control_checkbox = {
  template: "<div class=\"control_checkbox\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label v-for=\"(o, idx) in options\" :key=\"idx\" :class=\"{ 'active': has(o[field]), 'disabled': o.disabled }\" @click=\"selected(o[field])\"><span class=\"figure\"></span><span class=\"name\">{{ o.name }}</span></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  props: {
    symbol: {
      type: String,
      default: ","
    }
  },
  methods: {
    selected: function selected(val) {
      var arr = this.value.split(this.symbol);
      var idx = arr.indexOf(val);

      if (idx !== -1) {
        arr.splice(idx, 1);
      } else {
        arr.push(val);
      }

      var val = arr.join(this.symbol);

      if (val.indexOf(this.symbol) === 0) {
        val = val.substring(1);
      }

      this.$emit("input", val);
    },
    has: function has(val) {
      var arr = this.value.split(this.symbol);
      return arr.indexOf(val) !== -1;
    }
  }
};
var mm_code = {
  template: "<div class=\"mm_code\"><mm_icon :icon=\"icon\"></mm_icon><div class=\"title\" v-if=\"title\">{{ title }}</div><slot><mm_group><input type=\"text\" :value=\"value\" :placeholder=\"desc || placeholder\" @input=\"$emit('input', $event.target.value)\"></input><button :class=\"'btn-' + type\" v-html=\"btn\"></button></mm_group></slot><div class=\"tip\" v-if=\"tip\" v-html=\"tip\"></div></div>",
  mixins: [form_mixin],
  props: {
    placeholder: {
      type: String
    }
  },
  props: {
    btn: {
      type: String,
      default: "发送验证码"
    }
  },
  computed: {
    ds: function ds() {
      if (this.btn.indexOf("s") == -1) {
        return false;
      } else {
        return true;
      }
    }
  }
};

var control_input = {
  template: "<div class=\"control_input\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><input v-bind:class=\"{'auto-width': auto }\" :type=\"type\" :value=\"value\" :min=\"min\" :max=\"max\" :minlength=\"min_length\" :maxlength=\"max_length\" :placeholder=\"desc || placeholder\" @input=\"set\" :disabled=\"disabled\" :required=\"required\" @blur=\"$emit('blur')\" :style=\"style\" /><slot><span class=\"unit\" v-if=\"unit\">{{ unit }}</span></slot></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  props: {
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 0.625
    }
  },
  methods: {
    set: function set(e) {
      if (this.type === "number") {
        var value = e.target.value ? e.target.value : "0";

        if (value.length > this.max_length && this.max_length !== 0) {
          value = value.substring(0, this.max_length);
        }

        var num = Number(value);

        if (num > this.max && this.max !== 0) {
          num = this.max;
        } else if (num < this.min) {
          num = this.min;
        }

        e.target.value = num.toString();
        this.$emit("input", num);
      } else {
        this.$emit("input", e.target.value);
      }
    }
  },
  computed: {
    style: function() {
      if (this.auto && this.value) {
        var len = this.value.length;
        return "width:" + ((len + 1) * this.size) + "rem";
      } else {
        return '';
      }
    }
  }
};
var control_number = {
  template: "<div class=\"control_number\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><mm_btn class=\"btn_primary btn_del\" @click.native=\"del\"><span></span></mm_btn><input type=\"number\" :value.number=\"value\" :min=\"min\" :max=\"max\" @input=\"set\" @blur=\"setInt\" :disabled=\"disabled\"/><mm_btn class=\"btn_primary btn_add\" @click.native=\"add\"><span></span></mm_btn></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  methods: {
    setInt: function setInt(e) {
      var value = e.target.value ? e.target.value : "0";
      var num = Number(value);
      this.call(num);
    },
    add: function add() {
      this.call(this.value + this.num);
    },
    del: function del() {
      this.call(this.value - this.num);
    },
    set: function set(e) {
      var value = e.target.value ? e.target.value : "0";
      if (value == '-' || value.endsWith('.')) {

      } else if (value == '0-') {
        e.target.value = '-';
      } else {
        var num = Number(value);
        e.target.value = this.call(num);
      }
    },
    call: function call(num) {
      if (num > this.max && this.max !== 0) {
        num = this.max;
      } else if (num < this.min) {
        num = this.min;
      }
      this.$emit("input", num);
      return num;
    }
  }
};
var control_pager = {
  template: "<div class=\"control_pager\"><div class=\"nav\"><a href=\"javascript:void(0);\" v-if=\"display === '2'\" class=\"first\" @click=\"first\" v-bind:class=\"{ 'disabled': page === 1 }\"><span v-html=\"icons[0]\"></span></a><a href=\"javascript:void(0);\" class=\"previous\" @click=\"previous\" v-bind:class=\"{ 'disabled' : page <= 1 }\"><span v-html=\"icons[1]\"></span></a><a href=\"javascript:void(0);\" v-for=\"(p, i) in pages\" :key=\"i\" v-bind:class=\"{'active': page == p }\" @click=\"set(p)\">{{ p }}</a><a href=\"javascript:void(0);\" class=\"next\" v-bind:class=\"{ 'disabled': page >= ct }\" @click=\"next\"><span v-html=\"icons[2]\"></span></a><a href=\"javascript:void(0);\" v-if=\"display === '2'\" class=\"last\" v-bind:class=\"{ 'disabled': page == ct }\" @click=\"last\"><span v-html=\"icons[3]\"></span></a></div><slot></slot></div>",
  model: {
    prop: "page",
    event: "input"
  },
  props: {
    display: {
      type: String,
      default: "1"
    },
    count: {
      type: Number,
      default: 1
    },
    num: {
      type: Number,
      default: 5
    },
    page: {
      type: Number,
      default: 1
    },
    func: {
      type: Function,
      default: function _default(page) {}
    },
    icons: {
      type: Array,
      default: function _default() {
        return ["<<", "<", ">", ">>"];
      }
    }
  },
  data: function data() {
    return {
      pe: this.page
    };
  },
  computed: {
    ct: function ct() {
      var c = this.count ? this.count : 1;
      return Math.ceil(c);
    },
    pages: function pages() {
      var pe = this.page;
      var arr = [pe];
      var len = this.num;
      var end = this.ct;

      for (var i = 0; i < len; i++) {
        var right = pe + i + 1;

        if (right <= end) {
          arr.push(right);
        }

        var left = pe - i - 1;

        if (left > 0) {
          arr.push(left);
        }
      }

      return arr.splice(0, len).sort(function(a, b) {
        return a - b;
      });
    }
  },
  methods: {
    goTo: function goTo(page) {
      if (this.func) {
        this.func(page);
      }
      this.$emit("input", page);
    },
    first: function first() {
      this.pe = 1;
      this.goTo(this.pe);
    },
    previous: function previous() {
      this.pe = this.page - 1;

      if (this.pe < 1) {
        this.pe = 1;
      }
      this.goTo(this.pe);
    },
    set: function set(p) {
      this.pe = p;
      this.goTo(this.pe);
    },
    next: function next() {
      this.pe = this.page + 1;
      if (this.pe > this.ct) {
        this.pe = this.ct;
      }
      this.goTo(this.pe);
    },
    last: function last() {
      this.pe = this.ct;
      this.goTo(this.pe);
    }
  }
};
var control_radio = {
  template: "<div class=\"control_radio\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label v-for=\"(o, idx) in options\" :key=\"idx\" :class=\"{ 'active': value == o[field] }\" @click=\"$emit('input', $event.target.value)\"><input type=\"radio\" :name=\"name\" :value=\"o[field]\" /><span class=\"figure\"></span><span class=\"name\">{{ o.name }}</span></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  data: function data() {
    var name = this.name;

    if (!name) {
      name = $.md5(Math.random().toString()).substring(0, 8);
    }

    return {
      name: name
    };
  }
};
var control_reverse = {
  template: "<div class=\"control_reverse\"><div class=\"title\" v-if=\"title\" v-html=\"title\" @click=\"set\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><slot><div class=\"figure\" v-bind:class=\"{ 'reverse_arrow' : display !== '1' }\" @click=\"set\"><span class=\"up\" v-bind:class=\"{'active': selected === 0 }\"></span><span class=\"down\" v-bind:class=\"{'active': selected === 1 }\"></span></div></slot></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  methods: {
    set: function set() {
      var n = this.selected;
      n += 1;
      var lt = this.ops;
      var v = "";

      if (n < lt.length) {
        v = lt[n];
      } else if (n > lt.length) {
        n = 0;
        v = lt[0];
      }

      var val = this.value;
      var has = false;

      for (var i = 0; i < lt.length; i++) {
        var o = lt[i];

        if (val.indexOf(o) !== -1) {
          val = val.replace(o, v);
          has = true;
          val = val.replace(",,", ",");
          break;
        }
      }

      if (!has) {
        val += "," + v;
      }

      if (val.indexOf(",") === 0) {
        val = val.substring(1);
      }

      this.$emit("input", val.trim(','));

      if (this.func) {
        this.func(val);
      }
    }
  },
  computed: {
    ops: function ops() {
      var o = this.options;
      if (o) {
        if (typeof(o) === 'string') {
          return ["`" + o + "` asc", "`" + o + "` desc"]
        } else if (typeof(o) === 'object' && o.length > 1) {
          return o;
        } else if (this.field) {
          var f = this.field;
          return ["`" + f + "` asc", "`" + f + "` desc"]
        }
      }
      return ["asc", "desc"]
    },
    selected: function selected() {
      if (this.ops) {
        var lt = this.ops;
        var val = this.value;
        var selected = 2;

        for (var i = 0; i < lt.length; i++) {
          var o = lt[i];

          if (val.indexOf(o) !== -1) {
            selected = i;
            break;
          }
        }

        return selected;
      } else {
        return 0;
      }
    }
  }
};
var control_select = {
  template: "<div class=\"control_select\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><select v-if=\"type === 'text'\" :value=\"value\" @change=\"set\" :disabled=\"disabled\"><option v-for=\"(o, idx) in options\" :key=\"idx\" :value=\"o[field]\">{{ o.name }}</option></select><select v-else-if=\"type === 'multiple'\" :value=\"value\" @change=\"set\" :disabled=\"disabled\" multiple><option v-for=\"(o, idx) in options\" :key=\"idx\" :value=\"o[field]\">{{ o.name }}</option></select><a href=\"javascript:void(0)\" class=\"click\" v-else-if=\"type === 'click'\" v-bind:class=\"{ 'current': sw }\"><div :class=\"{'selected': !$slots.default}\" @click=\"sw = !sw\"><slot>{{ val_name }}</slot></div><div class=\"mm_box\"><ul><li v-for=\"(o, idx) in options\" :key=\"idx\" @click=\"click_fun(o[field]);sw = false\" :class=\"{ 'active': value === o[field] }\">{{ o.name }}</li></ul></div></a><a href=\"javascript:void(0)\" v-bind:class=\"type\" v-else><div class=\"selected\"><slot>{{ val_name }}</slot></div><div class=\"mm_box\"><ul><li v-for=\"(o, idx) in options\" :key=\"idx\" @click=\"click_fun(o[field])\" :class=\"{ 'active': value === o[field] }\">{{ o.name }}</li></ul></div></a></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  methods: {
    set: function set(e) {
      var value = e.target.value;
      this.$emit("input", value);
      if (this.value !== value) {
        this.$emit("change");
      }
    },
    click_fun: function click_fun(value) {
      this.$emit("input", value);
      this.func(value);
    }
  },
  computed: {
    val_name: function val_name() {
      var k = this.field;
      var v = this.value;
      var lt = this.options;
      var name = "";

      for (var i = 0; i < lt.length; i++) {
        var o = lt[i];

        if (o[k] === v) {
          name = o.name;
          break;
        }
      }

      return name;
    }
  }
};
var control_switch = {
  template: "<div class=\"control_switch\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><label :class=\"{ 'active': value === 1 }\" @click=\"set\"><div class=\"onoff\"><span class=\"on\" v-if=\"display === '1'\"></span><span class=\"off\" v-if=\"display === '1'\"></span></div></label></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  methods: {
    set: function set() {
      var val = 0;

      if (this.value === 0) {
        val = 1;
      }

      this.$emit("input", val);
    }
  }
};
var mm_nav = {
  template: "<div class=\"mm_nav\"><ul><li v-for=\"(o, index) in list\" :key=\"index\"><a :href=\"o.url\" v-if=\"o.url.indexOf('http:') === 0 || o.url.indexOf('https:') === 0\">{{ o.title }}<span class=\"message\" v-show=\"o.message > 0\">{{ o.message }}</span></a><router-link :to=\"o.url\" v-else>{{ o.title }}<span class=\"message\" v-show=\"o.message > 0\">{{ o.message }}</span></router-link></li></ul></div>",
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    vm: {
      type: Object,
      default: function _default() {
        return {
          icon: "icon",
          title: "title",
          desc: "desc",
          url: "url",
          name: "name",
          tip: "tip"
        };
      }
    }
  }
};

var bar_title = {
  template: "<div class=\"bar_title\"><slot></slot></div>",
  props: {}
};
var mm_content = {
  template: "<div class=\"mm_content\"><slot></slot></div>",
  props: {}
};
var mm_form = {
  template: "<form class=\"mm_form\"><slot></slot></form>",
  props: {}
};

var mm_upload_img = {
  template: "<div class=\"mm_upload_img\" v-bind:class=\"{ 'upload_add': !bg && !value }\">\t<div @click=\"choose()\"><mm_icon :src=\"value\" :style=\"'width:' + width + other\"></mm_icon>\t<slot></slot>\t<input type=\"file\" hidden @change=\"addImg\" :id=\"name\" accept=\"image/*\"/></div><div class=\"btns\"><mm_btn class='btn_default-x btn_link' v-if=\"value\" @click.native=\"preview = true\">预览</mm_btn><mm_btn class='btn_warning-x btn_link' v-if=\"value\" @click.native=\"$emit('input','')\">删除</mm_btn></div><mm_modal v-model=\"preview\" mask=\"true\"><div><img :src=\"value\" style=\"max-width:100%\" :alt=\"name\" /></div><mm_btn class=\"btn_close\" @click.native=\"preview = false\"><i class=\"fa-close\"></i></mm_btn></mm_modal></div>",
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    // 显示方式
    display: {
      type: String,
      default: '1'
    },
    // 显示隐藏
    show: {
      type: Boolean,
      default: false
    },
    func: {
      type: Function,
      default: function _default(obj) {}
    },
    width: {
      type: String,
      default: '5rem'
    },
    height: {
      type: String,
      default: ''
    },
    bg: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    var other = this.bg ? '; background: url(' + this.bg + ') center center no-repeat; background-size:100%' : '';

    if (this.height) {
      other += ';height:' + this.height;
    }

    return {
      other: other,
      preview: false
    };
  },
  methods: {
    choose: function choose() {
      this.$('.mm_upload_img #' + this.name).click();
    },
    addImg: function addImg(e) {
      var _this = this;

      var src,
        url = window.URL || window.webkitURL || window.mozURL,
        files = e.target.files;

      if (files.length > 0) {
        var file = files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function(e) {
          src = this.result;

          _this.$emit('input', src);

          if (_this.func) {
            _this.func(src, file);
          }
        };
      }
    }
  }
};

var mm_time = {
  template: "<div class=\"mm_time\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><input :type=\"type || 'datetime'\" :value=\"value\" @blur=\"set\" :disabled=\"disabled\"></select></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div></div>",
  mixins: [form_mixin],
  methods: {
    set: function set(e) {
      this.$emit("input", e.target.value);
    }
  },
  watch: {
    value: function value(e) {
      if (this.type === 'date') {
        this.$emit("input", new Date(this.value).toStr('yyyy-MM-dd'));
      } else if (this.type === 'datetime-local') {
        this.$emit("input", new Date(this.value).toStr('yyyy-MM-ddThh:mm:ss'));
      } else if (this.value.indexOf('Z') !== -1) {
        this.$emit("input", new Date(this.value).toStr('yyyy-MM-ddThh:mm'));
      }
    }
  }
};

var control_textarea = {
  template: "<div class=\"control_textarea\" :class=\"{ 'show-expand': sw }\"><div class=\"title\" v-if=\"title\" v-html=\"title\"></div><div class=\"value\" v-bind:class=\"{'disabled': disabled }\"><textarea :value=\"value\" @blur=\"set\" :disabled=\"disabled\" :placeholder=\"desc || placeholder\" v-if=\"type == 'text'\"></textarea><button class=\"btn_expand\" type=\"button\" v-show=\"$slots.default\" @click=\"sw = !sw\"><i class=\"fa-expand\"></i></button></div><div class=\"tip\" v-if=\"tip\">{{ tip }}</div><slot></slot></div>",
  mixins: [form_mixin],
  props: {
    placeholder: {
      type: String
    }
  },
  methods: {
    set: function set(e) {
      this.$emit("input", e.target.value);
    }
  }
};

var control_file = {
  template: "<label class='mm_btn'><input type=\"file\" :id=\"file_id\" :accept=\"accept\" class=\"mm_btn btn_primary-x\" @change=\"change\" hidden /><slot>导入</slot></label>",
  mixins: [form_mixin],
  props: {
    accept: {
      type: String,
      // default: ".xls,.xlsx,.csv",
      default: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,.csv"
    }
  },
  data: function data() {
    var id = this.id;

    if (!id) {
      id = "control_file" + parseInt(Math.random() * 1000 + 1, 10);
    }

    return {
      file_id: id
    };
  },
  methods: {
    change: function change(e) {
      var _this = this;
      var src,
        url = window.URL || window.webkitURL || window.mozURL,
        files = e.target.files;
      if (files.length > 0) {
        var file = files[0];
        this.$emit('change', file);

        if (this.func) {
          this.func(file);
        }
      }
      $("#" + this.file_id).val("");
    }
  }
};

return {
  install: function install(Vue, options) {
    //自定义拖动
    Vue.directive('drag',
      function(el, binding) {
        el.onmousedown = function(e) {
          e.preventDefault();
          let bw = document.body.clientWidth;
          let bh = document.body.clientHeight;
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - el.offsetLeft;
          let disY = e.clientY - el.offsetTop;
          // 计算两边坐标
          document.onmousemove = function(e) {
            let l = 0,
              t = 0;
            // 拖动边界
            if (e.clientX >= bw) {
              l = bw - disX;
            } else if (e.clientX <= 0) {
              {
                l = 0 - disX;
              }
            } else {
              l = e.clientX - disX;
            }
            if (e.clientY >= bh) {
              t = bh - disY;
            } else if (e.clientY <= 0) {
              t = 0 - disY;
            } else {
              t = e.clientY - disY;
            }
            //移动当前元素
            el.style.left = l + 'px';
            el.style.top = t + 'px';
          };
          // 鼠标停止移动时，事件移除
          document.onmouseup = function(e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      }
    );

    Vue.component("mm_icon", mm_icon);
    Vue.component("mm_btn", mm_btn);
    Vue.component("mm_loading", mm_loading);
    Vue.component("mm_body", mm_body);
    Vue.component("mm_row", mm_row);
    Vue.component("mm_col", mm_col);
    Vue.component("mm_foot", mm_foot);
    Vue.component("mm_grid", mm_grid);
    Vue.component("mm_group", mm_group);
    Vue.component("mm_head", mm_head);
    Vue.component("mm_item", mm_item);
    Vue.component("mm_list", mm_list);
    Vue.component("mm_main", mm_main);
    Vue.component("mm_modal", mm_modal);
    Vue.component("mm_movable", mm_movable);
    Vue.component("mm_page", mm_page);
    Vue.component("mm_view", mm_view);
    Vue.component("mm_card", mm_card);
    Vue.component("mm_side", mm_side);
    Vue.component("mm_table", mm_table);
    Vue.component("mm_warp", mm_warp);
    Vue.component("mm_container", mm_container);
    Vue.component("bar_title", bar_title);
    Vue.component("mm_content", mm_content);
    Vue.component("mm_form", mm_form);
    Vue.component("control_checkbox", control_checkbox);
    Vue.component("mm_code", mm_code);
    Vue.component("control_input", control_input);
    Vue.component("control_number", control_number);
    Vue.component("mm_time", mm_time);
    Vue.component("control_textarea", control_textarea);
    Vue.component("control_pager", control_pager);
    Vue.component("control_radio", control_radio);
    Vue.component("control_reverse", control_reverse);
    Vue.component("control_select", control_select);
    Vue.component("control_switch", control_switch);
    Vue.component("control_file", control_file);
    Vue.component("mm_nav", mm_nav);
    Vue.component("mm_nav_top", mm_nav_top);
    Vue.component("mm_upload_img", mm_upload_img);
  }
}
