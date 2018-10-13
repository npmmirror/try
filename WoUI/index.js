!function () {

}();
console.log("index");


$(function () {
    let myForm = document.getElementById("myForm");
    let prevent = myForm.getAttribute("prevent");
    console.log(prevent);
});

const vm = new Vue({
    el: '#app',
    methods: {
        checkForm(e) {
            console.log("this", this);
            console.log("e", e);
        }
    },
    data: {
        message: 'Hello Vue.js!'
    }
});

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

function getVue() {
    return new Vue({
        el: '#components-demo',
        data: {
            component_array: []
        },
        created() {
            console.log(123)
        },
        methods: {
            add() {
                this.component_array.push(1);
            }
        }
    });
}

let vm2 = getVue();

let dl_vm = new Vue({
    el: '#dl_app',
    data: {
        isEnter: false,
        seen: false,
        selected_list: [],
        dd_list: [],
    },
    created() {
        //渲染一级分类
        this.dd_list = [
            {name: "一级分类001", id: "2345655777558528", level: 1},
            {name: "一级分类002", id: "2349892859346944", level: 1},
        ]
    },
    computed: {
        select_sum: function () {
            return this.thirdLevelCategory || this.secondLevelCategory || this.firstLevelCategory;
        },
        firstLevelCategory() {
            if (this.selected_list[0])
                return this.selected_list[0].name;
            else
                return "";
        },
        secondLevelCategory() {
            if (this.selected_list[1])
                return this.selected_list[1].name;
            else
                return "";
        },
        thirdLevelCategory() {
            if (this.selected_list[2])
                return this.selected_list[2].name;
            else
                return "";
        }
    },
    methods: {
        //点击已选择的大类时剔除后面的项
        selected_back: function (event) {
            let idx = event.target.getAttribute("wo-index");
            let selected_item = this.selected_list[idx];
            this.selected_list.splice(idx);
            //render target category

            let level = selected_item.level;
            this.dd_list = [
                {name: level + "级分类001", id: "2345655777558528", level: level},
                {name: level + "级分类002", id: "2349892859346944", level: level},
            ];
        },
        //点击已选择的小类时进入下一级选择
        selected_dd: function (event) {
            let idx = event.target.getAttribute("wo-index");
            this.selected_list.push(this.dd_list[idx]);

            //render next category
            let level = this.dd_list[idx].level;
            if (level < 3) {
                this.dd_list = [
                    {name: level + 1 + "级分类001", id: "2345655777558528", level: level + 1},
                    {name: level + 1 + "级分类002", id: "2349892859346944", level: level + 1},
                ];
            }
            else {
                this.dd_list = [];
                this.isEnter = false;
                this.hide_dl();
                // this.seen = false;
            }
        },
        mouseenter_dl() {
            this.isEnter = true;
        },
        mouseleave_dl() {
            this.isEnter = false;
        },
        show_dl() {
            this.seen = true;
        },
        hide_dl() {
            if (this.isEnter === false) {
                this.seen = false;
            }
        },
        print(str) {
            console.log(str)
        }
    }

});
console.log(123);
