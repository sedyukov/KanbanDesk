new Vue({
    el: '#app',
    data: {
        legends: [],
        todos: [],
        inProgress: [],
        done: [],
        curTodos: [],
        curInProgress: [],
        curDone: [],
        todoText: "",
        inpText1: "",
        inpText2: "",
        inpText3: "",
        inpText: [],
        inProgressText: "2",
        doneText: "3",
        btnTextAdd1: "",
        btnTextAdd2: "",
        btnTextAdd3: "",
        isEdit: false,
        editID: "0",
        editType: 0,
        legend: 1,
        editLegID: "",
        legText: "",
        legNameInp: "",
        legIndex: 0,
        picked1: "green",
        picked2: "green",
        picked3: "green",
    },
    methods: {
        setLegId(id){
            const vm = this;
            vm.legend = id;
            vm.openLegend();
            let i = 0;
            while(id != vm.legends[i].id) {
                i++;
            }
            vm.legIndex = i;
            vm.legText = vm.legends[i].text;
            vm.legends.forEach((element) => {
              element.color = "";
            })
            vm.legends[i].color = "black";
            console.log(vm.legends[i].color);
        },
        saveText(){
            const vm = this;
            axios.put('/legend/'+vm.legend+'/', {
                    text: vm.legText,
                    link: "link",
                    name: vm.legends[vm.legIndex].name
                 })
                    .then(function (response) {
                        console.log(response.data)
                        axios.get('/legend/')
                    .then(function (response) {
                        console.log(response.data)
                        vm.legends = response.data
                    })
                })
        },
        changeTodo(id){
            const vm = this;
            let i = 0;
            while(id != vm.curTodos[i].id) {
                i++;
            }
            let text = vm.curTodos[i].text;
            let prio = vm.curTodos[i].prio;
            axios.put('/todo/'+id+'/', {
                    text: text,
                    legid: vm.legend,
                    type: 2,
                    prio: prio
                 })
                    .then(function (response) {
                        console.log(response.data)
                        axios.get('/todo/')
                    .then(function (response) {
                        console.log(response.data)
                        vm.todos = response.data
                        vm.openLegend();
                    })
                })
        },
        changeProgress(id){
            const vm = this;
            let i = 0;
            while(id != vm.curInProgress[i].id) {
                i++;
            }
            let text = vm.curInProgress[i].text;
            let prio = vm.curInProgress[i].prio;
            axios.put('/todo/'+id+'/', {
                    text: text,
                    legid: vm.legend,
                    type: 3,
                    prio: prio
                 })
                    .then(function (response) {
                        console.log(response.data)
                        axios.get('/todo/')
                    .then(function (response) {
                        console.log(response.data)
                        vm.todos = response.data
                        vm.openLegend();
                    })
                })
        },
        openLegend(){
            const vm = this;
            vm.todos.forEach((element) => {
                  element.color = " no";
                })
            vm.curTodos = vm.todos.filter(function(el){
                    return el.legid == vm.legend;
                });
                vm.curInProgress = vm.curTodos.filter(function(el){
                    return el.type == 2;
                });
                vm.curDone = vm.curTodos.filter(function(el){
                    return el.type == 3;
                });
                vm.curTodos = vm.curTodos.filter(function(el){
                    return el.type == 1;
                });

        },
        setEditID(id, type){
            const vm = this;
            isEdit = true;
            console.log(id + " " + type);
            vm.editID = id;
            let i = 0;
            if (type == 1){
                while(id !== vm.curTodos[i].id){
                   i++;
                }
                vm.curTodos.forEach((element) => {
                   element.color = " no";
                })
                vm.curTodos[i].color = " black";
                vm.picked1 = vm.curTodos[i].prio;
                vm.inpText1 = vm.curTodos[i].text;
                vm.btnTextAdd1 = "Edit note";
            }
            else if(type == 2){
                i = 0;
                while(id != vm.curInProgress[i].id){
                   i++;
                }
                vm.curInProgress.forEach((element) => {
                  element.color = " no";
                })
                vm.curInProgress[i].color = " black";
                vm.picked2 = vm.curInProgress[i].prio;
                vm.inpText2 = vm.curInProgress[i].text;
                vm.btnTextAdd2 = "Edit note";
            } else {
                i = 0;
                while (id != vm.curDone[i].id) {
                    i++;
                }
                vm.curDone.forEach((element) => {
                  element.color = " no";
                })
                vm.curDone[i].color = " black";
                vm.picked3 = vm.curDone[i].prio;
                vm.inpText3 = vm.curDone[i].text;
                vm.btnTextAdd3 = "Edit note";
            }

        },

        deleteTodo: function (id){
            const vm = this;
            console.log(id)
            axios.delete('/todo/'+id).then(function (response) {
                console.log(response.data)
                axios.get('/todo/').then(function (response) {
                    console.log(response.data)
                    vm.todos = response.data
                    vm.openLegend();
                })
            })

        },
        deleteLeg: function (id){
            const vm = this;
            console.log(id)
            axios.delete('/legend/'+id).then(function (response) {
                console.log(response.data)
                axios.get('/legend/').then(function (response) {
                    console.log(response.data)
                    vm.legends = response.data
                })
            })

        },
        createLeg: function (){
            const vm = this;
            axios.post('/legend/', {
                    text: "Your legend",
                    link: "link",
                    name: vm.legNameInp
                })
                    .then(function (response) {
                        vm.legid = response.data.id;
                        axios.get('/legend/').then(function (response) {
                            console.log(response.data)
                            vm.legends = response.data
                            vm.openLegend()
                        })
                    })
        },
        createTodo: function (type){
            const vm = this;
            vm.inpText[1] = vm.inpText1;
            vm.inpText[2] = vm.inpText2;
            vm.inpText[3] = vm.inpText3;
            vm.inpText1 = "";
            vm.inpText2 = "";
            vm.inpText3 = "";
            if(isEdit){
                vm.btnTextAdd1 = "Add New";
                vm.btnTextAdd2 = "Add New";
                vm.btnTextAdd3 = "Add New";
                let prio = "";
                if (type == 1) prio = vm.picked1;
                else if (type == 2) prio = vm.picked2;
                else prio = vm.picked3;
                axios.put('/todo/'+vm.editID+'/', {
                    text: vm.inpText[type],
                    legid: vm.legend,
                    type: type,
                    prio: prio
                 })
                    .then(function (response) {
                        axios.get('/todo/').then(function (response) {
                            console.log(response.data)
                            vm.todos = response.data
                            vm.openLegend();
                            vm.picked1 = "green";
                            vm.picked2 = "green";
                            vm.picked3 = "green";
                        })
                })
                isEdit = false;
            } else {
                let prio = "";
                if (type == 1) prio = vm.picked1;
                else if (type = 2) prio = vm.picked2;
                else prio = vm.picked3;
                axios.post('/todo/', {
                    text: vm.inpText[type],
                    legid: vm.legend,
                    type: type,
                    prio: prio
                })
                    .then(function (response) {
                        axios.get('/todo/').then(function (response) {
                            console.log(response.data)
                            vm.todos = response.data
                            vm.openLegend();
                            vm.picked1 = "green";
                            vm.picked2 = "green";
                            vm.picked3 = "green";
                        })
                    })
            }
        },


    },
    created: function () {
        const vm = this;
        isEdit = false;
        vm.legend = 0;
        vm.inpText1 = "";
        vm.inpText2 = "";
        vm.inpText3 = "";
        vm.inpText[1] = vm.inpText1;
        vm.inpText[2] = vm.inpText1;
        vm.inpText[3] = vm.inpText1;
        vm.btnTextAdd1 = "Add New";
        vm.btnTextAdd2 = "Add New";
        vm.btnTextAdd3 = "Add New";
        axios.defaults.xsrfHeaderName = 'X-CSRFToken'
        axios.defaults.xsrfCookieName = 'csrftoken'
        axios.get('/legend/')
            .then(function (response) {
                // console.log(response.data)
                vm.legends = response.data
                vm.legText = "";
                // vm.legends[1].color = "ss";
                // console.log(vm.legends)
            })
        axios.get('/todo/')
            .then(function (response) {
                console.log(response.data)
                vm.todos = response.data
            })

    }
}
)