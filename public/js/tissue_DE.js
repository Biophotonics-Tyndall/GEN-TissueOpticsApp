
async function getData() { // Function to load all the necessary data

}

function changeWV() {
    const wv_min = document.getElementById("wv_min").value;
    const wv_max = document.getElementById("wv_max").value;

    console.log(wv_min);
    console.log(wv_max);
}

function CWInfinite(mua,mus,SDD,P0) {
    const mueff = calcTissueMueff(mua,mus);
    var i;

    var fluence = [];
    for(i = 0; i < mua.length; i++){
        fl = P0*mueff[i]*mueff[i]/(4*Math.pi*mua[i]*SDD)*Math.exp(-mueff[i]*SDD);
        fluence.push(fluence);
    }
    return fluence;

}

function CWout(mua,mus,SDD,P0,ri) {
    const c0 = 299792458;
    const c = c0/ri;

    const mueff = calcTissueMueff(mua,mus);
    const muc = Math.cos(Math.asin(c/c0));
    const r0 = ((c0-c)/(c0+c))*((c0-c)/(c0+c));
    const kappa = ((1-r0)*(1-muc*muc))/(1+r0+(1-r0)*muc*muc*muc);
    const gamma = P0/(4*Math.pi);

    var i;
    var reflectance;
    for(i = 0; i<mua.length; i++){
        const diff = 1/(3*mua[i]*mus[i]);
        const ze = 2*diff/kappa;
        const z00 = 1/mus[i];
        const zp0 = -(2*ze+z00);
        const ro2 = Math.sqrt(SDD*SDD+z00*z00);
        const rp2 = Math.sqrt(SDD*SDD+zp0*zp0);

        const refl = gamma*(z00*(mueff[i]+1/ro2)*Math.exp(-mueff[i]*ro2)/(ro2*ro2)-zp0*(mueff[i]+1/rp2)*Math.exp(-mueff[i]*rp2)/(rp2*rp2));
        reflectance.push(refl);
    }
    return reflectance;
}

function CDsemi(mua,mus,SDD,Depth,P0,ri) {
    const c0 = 299792458;
    const c = c0/ri;
    const mueff = calcTissueMueff(mua,mus);
    const muc = Math.cos(Math.asin(c/c0));
    const r0 = ((c0-c)/(c0+c))*((c0-c)/(c0+c));
    const kappa = ((1-r0)*(1-muc*muc))/(1+r0+(1-r0)*muc*muc*muc);

    var i;
    var fluence;

    for(i = 0; i<mua.length; i++){
        const diff = 1/(3*mua[i]*mus[i]);
        const ze = 2*diff/kappa;
        const z00 = 1/mus[i];
        const zp0 = -(2*ze+z00);
        const gamma = P0*mueff[i]*mueff[i]/(4*Math.pi*mua[i]);
        const ro2 = Math.sqrt(SDD*SDD+(z00-Depth)*(z00-Depth));
        const rp2 = Math.sqrt(SDD*SDD+(zp0-Depth)*(zp0-Depth));

        const fl = gamma*(Math.exp(-mueff[i]*ro2)/ro2-Math.exp(-mueff[i]*rp2)/rp2);
        fluence.push(fl);
    }
    return fluence;
}

function calcTissueMueff(mua,mus) {
    var mueff = [];
    var i;

    for (i=0; i<mua.length; i++){
        const m = Math.sqrt(3*mua[i]*mus[i]);
        mueff.push(m);
    }
    return mueff;
}