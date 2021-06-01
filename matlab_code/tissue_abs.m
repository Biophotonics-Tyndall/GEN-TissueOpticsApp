
% TISSUE_ABS - Calculates the tissue absorption coefficient at wavelengths between 430 - 1000 nm using the 
%   absorption spectra of the major tissue chromophores. 
%
% USEAGE: absorption=tissue_abs(concblood,sto2,hb,hbo2,concwater,water,conclipid,lipid,wavelength)
%
% ARGUMENTS:
%   concblood:   Blood volume concentration [%]
%   sto2:        Oxygen saturation of blood [%]
%   hb:          Absorption coecient spectrum of deoxygenated hemoglobin [m-1]
%   hbo2:        Absorption coecient spectrum of oxygenated hemoglobin [m-1]
%   concwater:   Water volume concentration [%]
%   water:       Absorption coecient spectrum of water [m-1]
%   conclipid:   Lipid volume concentration [%]
%   lipid:       Absorption coecient spectrum of lipid [m-1]
%   wavelength:  Vector with wavelengths for the spectra [nm]
%
% OUTPUT:
%   absorption:  A dual column vector containing the wavelengths and the corresponding absorption coefficients 
%   
% EXAMPLES:
%   >> load absorption_spectra;
%   >> abs1=tissue_abs(5,60,data.hb,data.hbo2,65,data.water,15,data.lipid,data.wavelength);
%   >> plot(data.wavelength,log(abs1))

function absorption=tissue_abs(cblood,sat,hemo,hemoo2,ch2o,h20,cfat,fat,wl)

warning off MATLAB:divideByZero

% Concerntrations of Hb and HbO2
chemo=cblood*(1-sat/100)/100;
chemoo2=cblood*(sat/100)/100;

% Absorption coefficient is calculated as the weighted sum of the absorption from the chromophores
absorption=chemo.*hemo+chemoo2.*hemoo2+ch2o.*h20./100+cfat.*fat./100;
% close all
% plot(wl(230:420),chemo.*hemo(230:420))
% figure
% plot(wl(230:420),chemoo2.*hemoo2(230:420))
% figure
% plot(wl(230:420),ch2o.*h20(230:420)./100)
% figure
% plot(wl(230:420),cfat.*fat(230:420)./100)
% figure
% plot(wl(230:420),absorption(230:420))




