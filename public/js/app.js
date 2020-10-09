const app = new Vue({
    el: '#app',
    data: {
        toDo: {
            data: [],
        },
        input: '',
    },
    methods: {
        check: function (id) {
            let index = this.toDo.data.findIndex(data => data.id === id)
            this.$resource('/api/tasks/update').update(
                {
                    id: id,
                    done: this.toDo.data[index].done
                }
            ).then(
                response => {
                    
                },
                response => {
                    console.log(response)
                }
            )
        },
        doneAll: function() {
            let doneAll = true
            for (let i = 0; i < this.toDo.data.length; ++i) {
                doneAll &= this.toDo.data[i].done
            }
            return doneAll
        },
        addTask: function() {
            this.$resource('/api/tasks/create').save(
                {
                    task: this.input
                }
            ).then(
                response => {
                    let new_item = response.body
                    if (new_item.hasOwnProperty('id')) {
                        this.toDo.data.push(new_item)
                    }
                    this.input = ''
                },
                response => {
                    console.log(response)
                }
            )
            
        },
        deleteTask: function (id_target) {
            if (confirm('Yakin dihapus?')) {
                let index = this.toDo.data.findIndex(data => data.id === id_target)
                if (index > -1) {
                    this.$resource('/api/tasks/delete').remove({id:id_target}).then(
                        response => {
                            response = response.body
                            if (response.hasOwnProperty('status')){
                                this.toDo.data.splice(index,1)
                            }
                        },
                        response => {
                            console.log(response)
                        }
                    )
                }
            }
        },
        test: function () {
            this.$resource('/api/tasks').get().then(
                response => {
                    this.toDo.data.push(response.body)
                }
            )
        }
    },
    created: function () {
        this.$resource('/api/tasks').get().then(
            response => {
                let items = response.body
                for (let i = 0; i < items.length; ++i)
                    this.toDo.data.push(items[i])
            }
        )
    }
});
