var currentUrlArr = window.location.href.split("/");
var root = (currentUrlArr[currentUrlArr.length - 2] === 'pages') ? currentUrlArr.slice(0, currentUrlArr.length - 2).join('/') : currentUrlArr.slice(0, currentUrlArr.length - 1).join('/');

document.write(`
    <div class="navbar">
        <div class="navbar-title">
            Tissue Optics App
        </div class="navbar-menu">
            <div class="navbar-item"><a href="${root}/index.html">Home</a></div>
            <div class="navbar-item"><a href="${root}/pages/tissue_abs.html">Tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}/pages/tissue_abs_inv.html">Inverse tissue absorption</a></div>
            <div class="navbar-item"><a href="${root}/pages/tissue_mueff.html">Effective attenuation coefficient</a></div>
            <div class="navbar-item"><a href="${root}/pages/tissue_DE.html">Diffusion equation</a></div>
            <div class="navbar-item"><a href="${root}/pages/about.html">About</a></div>
        </div>
    <div class="footer">
        <p>Tissue Optic App</p>
        <div>Original Matlab Code by: J. Gunther - Developed for web browser by: B. Jayet and J.S. Matias</div>
    </div>
`);