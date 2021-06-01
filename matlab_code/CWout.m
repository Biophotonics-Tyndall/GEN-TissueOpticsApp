% CWOUT - Diffuse reflectance as a function of wavelength for a specified radial distance of the detector in a semi infinite geometry
%              (cylindrical symmetry) 
%
% USEAGE: reflectance=CWout(abs1,sca1,rho,P_in,n_tissue,wavelength)
%
% ARGUMENTS:
%   abs1 = vector of absorption coefficient spectrum [1/m]
%   sca1 = vector of scattering coefficient spectrum [1/m]
%   rho  = radial coordinate for the detector fibre tip [m]
%   P_in = power of the light source [W]
%   n_tissue   = refractive index of tissue [-]
%   wavelength = vector of wavelengths for abs1, sca1times and fluence [nm]
%
% OUTPUT:
%   reflectance = a vector containing fluence data
%   
% EXAMPLES:
%   >> clear all
%   >> load absorption_spectra;
%   >> rho=5*1e-3;
%   >> P_in=0.01;
%   >> n_tissue=1.4;
%
%   >> abs1=tissue_abs(5,60,data.hb,data.hbo2,70,data.water,15,data.lipid,data.wavelength);
%   >> sca1=tissue_sca(500,1000,1,data.wavelength);
%
%   >> refl=CWsemi_out(abs1,sca1,rho,P_in,n_tissue,data.wavelength);
%
%   >> close all
%   >> plot(data.wavelength,refl);
%   >> title('Diffuse reflectance spectrum as a function of wavelength at radial distance position (rho)')
%
%   >> %%%% Axis labels
%   >> xlabel('Wavelength (nm)')
%   >> ylabel('Diffuse Reflectance (Wm^{-2})')
%
%   >> %%% axes handling
%   >> box off
%   >> xlim_Lower = 350;
%   >> xlim_Upper = 1400;
%   >> set(gca, 'xlim',[xlim_Lower xlim_Upper]);
%   >> set(gca, 'XTick', xlim_Lower+50:100:xlim_Upper);
%   >> set(gca, 'YTickLabel', xlim_Lower+50:100:xlim_Upper);
%
%   >> ylim_Lower = 0;
%   >> ylim_Upper = 100;
%   >> set(gca, 'ylim',[ylim_Lower ylim_Upper]);
%   >> set(gca, 'YTick', ylim_Lower:20:ylim_Upper);
%   >> set(gca, 'YTickLabel', ylim_Lower:20:ylim_Upper)


function reflectance=CWout(mua,mus,r,P,n,wl)

warning off MATLAB:divideByZero

% Speed of light
c0=3e8;
c=c0/n;

% Diffusion Theory (Extrapolated boundary)
diff  = 1./(3.*(mua+mus));
mueff=tissue_mueff(mua,mus);
muc   = cos(asin(c/c0));
r0    = ((c0-c)/(c0+c))^2;
kappa = ((1-r0)*(1-muc*muc))/(1+r0+(1-r0)*muc*muc*muc);
ze    = 2.*diff./kappa;
z00   = 1./mus;		
zp0   = -(2*ze + z00);	

gamma=P/(4*3.1415);

ro2 = sqrt(r^2+(z00).^2);	
rp2 = sqrt(r^2+(zp0).^2);
reflectance = gamma.*(z00.*(mueff+1./ro2).*exp(-mueff.*ro2)./(ro2.*ro2)-zp0.*(mueff+1./rp2).*exp(-mueff.*rp2)./(rp2.*rp2));	

