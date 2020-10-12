Vue.component('tasks-section', {
    data: function(){ return {
        toDo: {
            data: [],
        },
        input: '',
    }},
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
    },
    template:'<h1 v-if="toDo.data.length > 0 && doneAll()">😉 Keren! Semua tugas telah selesai.</h1>\
    <h1 v-else-if="toDo.data.length > 0">🔥🔥🔥 Semangat! Ini semua harus selesai.</h1>\
    <h1 v-else>Ayo, list tugasmu di sini. &#8595;</h1>\
    <div class="tambah">\
        <span>Tambah list baru:</span>\
        <input type="text" @keyup.enter="addTask" v-model="input">\
    </div>\
    <div class="list-tugas" v-for="task in toDo.data" :key="task.id">\
        <a href="javascript: void(0)" @click="deleteTask(task.id)">&#x2326;</a>\
        <input type="checkbox" v-model="task.done" @click="check(task.id)">\
        <span>@{{ task.task }}</span>\
    </div>\
    <div class="bayangan" v-if="input">\
        <a href="javascript: void(0)">&#x2326;</a>\
        <input type="checkbox" onclick="return false;">\
        <span>@{{ input }}</span>\
    </div>'
})

const app = new Vue({el: '#app',});
