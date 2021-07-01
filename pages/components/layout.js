// JavaScript code for the layout of the pages of the Tissue Optics App
// Part of the TissueOpticsApp
// Written by B. Jayet & J. S. Matias 
// Adapted from a MATLAB based app by J. Gunther

var currentUrlArr = window.location.href.split("/");
var root = (currentUrlArr[currentUrlArr.length - 2] === 'pages') ? currentUrlArr.slice(0, currentUrlArr.length - 2).join('/') : currentUrlArr.slice(0, currentUrlArr.length - 1).join('/');

// Check the screen width to avoid not supported devices
var bodyWidth = document.getElementsByTagName('body')[0].clientWidth;

if (bodyWidth > 1000){
    document.write(`
        <div class="navbar">
            <div class="navbar-title"> Tissue Optics App </div>
            <div class="navbar-menu">
                <div class="navbar-item"><a href="${root}/index.html">Home</a></div>
                <div class="navbar-item"><a href="${root}/pages/tissue_abs.html">Tissue absorption</a></div>
                <div class="navbar-item"><a href="${root}/pages/tissue_abs_inv.html">Inverse tissue absorption</a></div>
                <div class="navbar-item"><a href="${root}/pages/tissue_mueff.html">Effective attenuation coefficient</a></div>
                <div class="navbar-item"><a href="${root}/pages/tissue_DE.html">Diffusion equation</a></div>
                <div class="navbar-item"><a href="${root}/pages/about.html">About</a></div>
            </div>
        <div class="footer">
            <p>Tissue Optic App for educational purpose</p>
            <p>Source code available under MIT licence on <a href="https://github.com/Biophotonics-Tyndall/GEN-TissueOpticsApp">GitHub</a></p>
        </div>
    `);
} else {
    if (currentUrlArr.slice(-1)[0] !== 'index.html'){
        window.location.replace(root + "/index.html");
    }

    var info = document.getElementsByClassName('info-area')[0];
    var app = document.getElementsByClassName('app')[0];
    app.style.margin = 0;
    info.textContent = "Oh Noooo! 😰 This app is not supported for your screen size. Please try again on a larger one.";
    document.write(`
        <div class="footer">
            <p>Tissue Optic App for educational purpose</p>
            <p>Source code available under MIT licence on <a href="https://github.com/Biophotonics-Tyndall/GEN-TissueOpticsApp">GitHub</a></p>
        </div>
    `);
}