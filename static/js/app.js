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
        legIndex: 0
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
            axios.put('/todo/'+id+'/', {
                    text: text,
                    legid: vm.legend,
                    type: 2
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
            axios.put('/todo/'+id+'/', {
                    text: text,
                    legid: vm.legend,
                    type: 3
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
                vm.inpText1 = vm.curTodos[i].text;
                vm.btnTextAdd1 = "Edit note";
            }
            else if(type == 2){
                i = 0;
                while(id != vm.curInProgress[i].id){
                   i++;
                }
                vm.inpText2 = vm.curInProgress[i].text;
                vm.btnTextAdd2 = "Edit note";
            } else {
                i = 0;
                while (id != vm.curDone[i].id) {
                    i++;
                }

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
                axios.put('/todo/'+vm.editID+'/', {
                    text: vm.inpText[type],
                    legid: vm.legend,
                    type: type
                 })
                    .then(function (response) {
                        axios.get('/todo/').then(function (response) {
                            console.log(response.data)
                            vm.todos = response.data
                            vm.openLegend();
                        })
                })
                isEdit = false;
            } else {
                axios.post('/todo/', {
                    text: vm.inpText[type],
                    legid: vm.legend,
                    type: type
                })
                    .then(function (response) {
                        axios.get('/todo/').then(function (response) {
                            console.log(response.data)
                            vm.todos = response.data
                            vm.openLegend();
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
                console.log(response.data)
                vm.legends = response.data
                vm.legText = "";
            })
        axios.get('/todo/')
            .then(function (response) {
                console.log(response.data)
                vm.todos = response.data
            })

    }
}
)