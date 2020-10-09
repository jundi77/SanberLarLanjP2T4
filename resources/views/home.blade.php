<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Daftar Tugas</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{asset('style/app.css')}}">
    </head>
    <body>

        <div id="app">
		<h1 v-if="toDo.data.length > 0 && doneAll()">😉 Keren! Semua tugas telah selesai.</h1>
		<h1 v-else-if="toDo.data.length > 0">🔥🔥🔥 Semangat! Ini semua harus selesai.</h1>
		<h1 v-else>Ayo, list tugasmu di sini. &#8595;</h1>
		<div class="tambah">
			<span>Tambah list baru:</span>
			<input type="text" @keyup.enter="addTask" v-model="input">
		</div>
		<div class="list-tugas" v-for="task in toDo.data" :key="task.id">
			<a href="javascript: void(0)" @click="deleteTask(task.id)">&#x2326;</a>
			<input type="checkbox" v-model="task.done" @click="check(task.id)">
			<span>@{{ task.task }}</span>
		</div>
		<div class="bayangan" v-if="input">
			<a href="javascript: void(0)">&#x2326;</a>
			<input type="checkbox" onclick="return false;">
			<span>@{{ input }}</span>
		</div>
	</div>
        <script src="{{asset('js/vue.js')}}"></script>
        <script src="{{asset('js/vue-resource.js')}}"></script>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>