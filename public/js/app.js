const app = new Vue({
    el: '#app',
    data: {
        toDo: {
            data: [
                {
                    id: 0,
                    task: "Mengisi air",
                    done: true
                },
            ],
        },
        input: '',
    },
    methods: {
        check: function (index) {
            console.log('check')
        },
        doneAll: function() {
            let doneAll = true
            for (let i = 0; i < this.toDo.data.length; ++i) {
                doneAll = this.toDo.data[i].done
            }
            return doneAll
        },
        addTask: function() {
            /* ajax post
             let new_task = ajax get
            if new_task.hasOwnProperty('id') {
                this.toDo.data.push(new_task)
            }
            */
        },
        deleteTask: function (id_target) {
            if (confirm('Yakin dihapus?')) {
                let index = this.toDo.data.findIndex(data => data.id === id_target)
                if (index > -1) {
                    // ajax delete
                    console.log(this.toDo.data[index])
                    this.toDo.data.splice(index)
                }
            }
        },
        test: function () {
            this.$resource('/api/tasks').get().then(
                response => {
                    console.log(response)
                }
            )
        }
    },
    created: function () {
        this.$resource('/api/tasks').get().then(
            response => {
                console.log(response)
            }
        )
    }
});
