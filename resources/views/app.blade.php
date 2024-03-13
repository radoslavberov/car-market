<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <link href="/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
    <link href="/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
    <link href="/apple-touch-icon.png" rel="apple-touch-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Анализ на БГ имоти" />

    <title>{{ config('app.name') }}</title>

    @viteReactRefresh
    @vite('resources/frontend/main.tsx')
</head>

<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
</body>

</html>
