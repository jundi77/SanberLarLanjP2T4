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
		<tasks-section></tasks-section>
	</div>
        <script src="{{asset('js/vue.js')}}"></script>
        <script src="{{asset('js/vue-resource.js')}}"></script>
        <script src="{{asset('js/app.js')}}"></script>
    </body>
</html>