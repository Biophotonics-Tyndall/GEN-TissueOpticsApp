% CWSEMI - Photon fluence rate as a function of wavelength for a specified position of the detectorp in a semi infinite geometry
%        (cylindrical symmetry) 
%
% USEAGE: fluence=CWsemi(abs1,sca1,rho,z,P_in,n_tissue,wavelength)
%
% ARGUMENTS:
%   abs1 = vector of absorption coefficient spectrum [1/m]
%   sca1 = vector of scattering coefficient spectrum [1/m]
%   rho  = radial coordinate for the detector fibre tip [m]
%   z    = depth coordinate for detector fibre tip [m]
%   P_in = power of the light source [W]
%   n_tissue   = refractive index of tissue [-]
%   wavelength = vector of wavelengths for abs1, sca1times and fluence [nm]
%
% OUTPUT:
%   fluence = a vector containing fluence data
%   
% EXAMPLES:
%   >> clear all
%   >> load absorption_spectra;
%   >> rho=5*1e-3;
%   >> z=2e-2;
%   >> P_in=0.01;
%   >> n_tissue=1.4;
%
%   >> abs1=tissue_abs(5,60,data.hb,data.hbo2,70,data.water,15,data.lipid,data.wavelength);
%   >> sca1=tissue_sca(500,1000,1,data.wavelength);
%
%   >> fluence1=CWsemi(abs1,sca1,rho,z,P_in,n_tissue,data.wavelength);
%
%   >> close all
%   >> plot(data.wavelength,fluence1);
%   >> title('Fluence rate spectrum as a function of wavelength at position (rho,z)')
%
%   >> %%%% Axis labels
%   >> xlabel('Wavelength (nm)')
%   >> ylabel('Fluence Rate (Wm^{-2})')
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


function fluence=CWsemi(mua,mus,r,z0,P,n,wl)

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

D=(mueff.*mueff)./mua;
gamma=P.*mueff.*mueff./(4.*3.1415.*mua);
size(gamma)

ro2 = sqrt(r^2+(z00-z0).^2);	
rp2 = sqrt(r^2+(zp0-z0).^2);

fluence = gamma.*(exp(-mueff.*ro2)./ro2-exp(-mueff.*rp2)./rp2);	

