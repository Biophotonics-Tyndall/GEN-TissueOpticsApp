var currentUrlArr = window.location.href.split("/")
var root = (currentUrlArr[currentUrlArr.length - 2] === 'pages') ? "./" : "./pages/"
/*
document.write(`
    <div class="navbar">
        <div class="navbar-title">
            Tissue Optics App
        </div class="navbar-menu">
            <div class="navbar-item"><a href="../index.html">Home</a></div>
            <div class="navbar-item"><a href="${root}layout.html">Layout template</a></div>
            <div class="navbar-item"><a href="${root}tissue_abs.html">Tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}tissue_abs_inv.html">Inverse tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}tissue_mueff.html">Effective attenuation coefficient</a></div>
            <div class="navbar-item"><a href="${root}tissue_DE.html">Diffusion equation</a></div>
        </div>
    <div class="footer">
        <p>Tissue Optic App</p>
        <div>Original Matlab Code by: J. Gunther - Developed for web browser by: B. Jayet and J.S. Matias</div>
    </div>
`);*/

document.write(`
    <div class="navbar">
        <div class="navbar-title">
            Tissue Optics App
        </div class="navbar-menu">
            <div class="navbar-item"><a href="../index.html">Home</a></div>
            <div class="navbar-item"><a href="${root}tissue_abs.html">Tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}tissue_abs_inv.html">Inverse tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}tissue_mueff.html">Effective attenuation coefficient</a></div>
            <div class="navbar-item"><a href="${root}tissue_DE.html">Diffusion equation</a></div>
            <div class="navbar-item"><a href="${root}about.html">About</a></div>
        </div>
    <div class="footer">
        <p>Tissue Optic App</p>
        <div>Original Matlab Code by: J. Gunther - Developed for web browser by: B. Jayet and J.S. Matias</div>
    </div>
`);