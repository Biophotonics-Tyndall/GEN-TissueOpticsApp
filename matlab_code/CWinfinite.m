
% CWINFINITE - Calculates the fluence rate in tissue as a function of distance and wavelength 250 - 1600 nm using the 
%   diffusion approximation. 
%
% USEAGE: fluence=CWinfinite(absorption,scattering,r,P_in)
%
% ARGUMENTS:
%   absorption:  Vector of absorption coefficients in the wavelength range given by the wavelength vector [m-1]
%   scattering:  Vector of scattering coefficients in the wavelength range given by the wavelength vector [m-1]
%   r:           Vector of distances for which the fluence rate will be calculated [m]
%   P_in:        Input power for the point source [W]
%   wavelength:  Vector of wavelengths
%   
%
% OUTPUT:
%   fluence:  A matrix providing the fluence rate as a function of distance and wavelength 
%   
% EXAMPLES:
%   >> load absorption_spectra;
%   >> abs1=tissue_abs(5,60,data.hb,data.hbo2,65,data.water,15,data.lipid,data.wavelength);
%   >> sca1=tissue_sca(500,1000,1,data.wavelength);
%   >> r=(5:0.1:20)*1e-3;
%   >> P_in=0.01;
%   >> fluence=CWinfinite(abs1,sca1,r,P_in,data.wavelength);
%   >> imagesc(fluence);

function fluence=CWinfinite(a2,s2,radius,P,wavelength)

warning off MATLAB:divideByZero

mueff=tissue_mueff(a2,s2);
n_mueff=length(mueff);

n_lambda=length(wavelength);
n_r=length(radius);

% Create empty array
%fluence=zeros(n_lambda,n_r);

% Determine fluence in mm grid
for i_r=1:n_r
    for i_lambda=1:n_lambda
          fluence(i_lambda,i_r)=P*mueff(i_lambda)*mueff(i_lambda)/(4*3.1415*a2(i_lambda)*radius(i_r))*exp(-mueff(i_lambda)*radius(i_r));
    end
end





