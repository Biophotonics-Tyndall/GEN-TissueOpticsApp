
% TISSUE_MUEFF - Calculates the tissue effective attenuation coefficient at wavelengths between 250 - 1600 nm using the 
%   absorption and reduced scattering coefficients calculated using the functions tissue_abs and tissue_sca, respectively. 
%
% USEAGE: mueff=tissue_mueff(absorption, scattering)
%
% ARGUMENTS:
%   absorption:  Vector of absorption coefficients in the wavelength range given by the wavelength vector [m-1]
%   scattering:  Vector of scattering coefficients in the wavelength range given by the wavelength vector [m-1]
%
% OUTPUT:
%   mueff:  A vector containing the effective attenuation coefficients versus wavelength [m-1]  
%   
% EXAMPLES:
%   >> close all
%   >> load absorption_spectra;
%   >> abs1=tissue_abs(5,60,data.hb,data.hbo2,65,data.water,15,data.lipid,data.wavelength);
%   >> sca1=tissue_sca(500,1000,1,data.wavelength);
%   >> mueff=tissue_mueff(abs1,sca1);
%   >> plot(data.wavelength,abs1);
%   >> figure;
%   >> plot(data.wavelength,sca1);
%   >> figure;
%   >> plot(data.wavelength,mueff);


function muff=tissue_mueff(a1,s1)

muff=sqrt(3.*a1.*s1);

 



