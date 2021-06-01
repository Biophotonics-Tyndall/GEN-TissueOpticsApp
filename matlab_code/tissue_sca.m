
% TISSUE_SCA - Calculates the tissue scattering coefficient at wavelengths between 430 - 1000 nm using the 
%   scttaring functions for Rayleigh and Mie scattering. 
%
% USEAGE: scattering=tissue_sca(a_R,a_M,b_M,wavelength)
%
% ARGUMENTS:
%   a_R:         Coefficient for the Rayleigh scattering probability per unit length in tissue [m-1]
%   a_M:         Coefficient for the Mie scattering probability per unit length in tissue [m-1]
%   b_M:         Parameter describing the wavelength dependence of Mie scattering (scatterer size dependent) [-]
%   wavelength:  Vector of wavelengths [nm]
%
% OUTPUT:
%   scattering:  A vector containing the scattering coefficients for all wavelengths  
%   
% EXAMPLES:
%   >> close all
%   >> load absorption_spectra;
%   >> sca1=tissue_sca(500,1000,1,data.wavelength);
%   >> plot(data.wavelength,log(sca1))



function scattering=tissue_sca(a_Ray,a_Mie,b_Mie,wl)


% Scattering coefficient is calculated as the weighted sum of the Rayleigh and Mie scattering in tissue
scattering=a_Ray.*exp(log(wl./500).*(-4))+a_Mie.*exp(log(wl./500).*(-b_Mie));

 



