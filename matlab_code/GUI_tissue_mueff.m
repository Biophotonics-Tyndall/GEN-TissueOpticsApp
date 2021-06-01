function varargout = GUI_tissue_mueff(varargin)
% GUI_TISSUE_MUEFF MATLAB code for GUI_tissue_mueff.fig
%      GUI_TISSUE_MUEFF, by itself, creates a new GUI_TISSUE_MUEFF or raises the existing
%      singleton*.
%
%      H = GUI_TISSUE_MUEFF returns the handle to a new GUI_TISSUE_MUEFF or the handle to
%      the existing singleton*.
%
%      GUI_TISSUE_MUEFF('CALLBACK',hObject,eventData,handles,...) calls the local
%      function named CALLBACK in GUI_TISSUE_MUEFF.M with the given input arguments.
%
%      GUI_TISSUE_MUEFF('Property','Value',...) creates a new GUI_TISSUE_MUEFF or raises the
%      existing singleton*.  Starting from the left, property value pairs are
%      applied to the GUI before GUI_tissue_mueff_OpeningFcn gets called.  An
%      unrecognized property name or invalid value makes property application
%      stop.  All inputs are passed to GUI_tissue_mueff_OpeningFcn via varargin.
%
%      *See GUI Options on GUIDE's Tools menu.  Choose "GUI allows only one
%      instance to run (singleton)".
%
% See also: GUIDE, GUIDATA, GUIHANDLES

% Edit the above text to modify the response to help GUI_tissue_mueff

% Last Modified by GUIDE v2.5 15-Jun-2018 16:14:39

% Begin initialization code - DO NOT EDIT
gui_Singleton = 1;
gui_State = struct('gui_Name',       mfilename, ...
                   'gui_Singleton',  gui_Singleton, ...
                   'gui_OpeningFcn', @GUI_tissue_mueff_OpeningFcn, ...
                   'gui_OutputFcn',  @GUI_tissue_mueff_OutputFcn, ...
                   'gui_LayoutFcn',  [] , ...
                   'gui_Callback',   []);
if nargin && ischar(varargin{1})
    gui_State.gui_Callback = str2func(varargin{1});
end

if nargout
    [varargout{1:nargout}] = gui_mainfcn(gui_State, varargin{:});
else
    gui_mainfcn(gui_State, varargin{:});
end
% End initialization code - DO NOT EDIT

% --- Executes just before GUI_tissue_mueff is made visible.
function GUI_tissue_mueff_OpeningFcn(hObject, eventdata, handles, varargin)
% This function has no output args, see OutputFcn.
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
% varargin   command line arguments to GUI_tissue_mueff (see VARARGIN)

% Choose default command line output for GUI_tissue_mueff
handles.output = hObject;

% Update handles structure
guidata(hObject, handles);

% This sets up the initial plot - only do when we are invisible
% so window can get raised using GUI_tissue_mueff.
if strcmp(get(hObject,'Visible'),'off')
    % cla;
pushbutton1_Callback(hObject, eventdata, handles)
end

% UIWAIT makes GUI_tissue_mueff wait for user response (see UIRESUME)
% uiwait(handles.figure1);


% --- Outputs from this function are returned to the command line.
function varargout = GUI_tissue_mueff_OutputFcn(hObject, eventdata, handles)
% varargout  cell array for returning output args (see VARARGOUT);
% hObject    handle to figure
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Get default command line output from handles structure
varargout{1} = handles.output;

% --- Executes on button press in pushbutton1.
function pushbutton1_Callback(hObject, eventdata, handles)
% hObject    handle to pushbutton1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% cla;
blood_con(1) = edit1_Callback(handles.edit1); %
% blood_con(2) = edit2_Callback(handles.edit2); % 
% blood_con(3) = edit3_Callback(handles.edit3); % 

so2(1) = edit4_Callback(handles.edit4); %
% so2(2) = edit5_Callback(handles.edit5); % 
% so2(3) = edit6_Callback(handles.edit6); % 


wtr(1) = edit7_Callback(handles.edit7); %
% wtr(2) = edit8_Callback(handles.edit8); % 
% wtr(3) = edit9_Callback(handles.edit9); % 

lpd(1) = edit10_Callback(handles.edit10); %
% lpd(2) = edit11_Callback(handles.edit11); % 
% lpd(3) = edit12_Callback(handles.edit12); % 


a_Ray = edit2_Callback(handles.edit2); % 
a_Mie = edit5_Callback(handles.edit5); % 
b_Mie = edit8_Callback(handles.edit8); % 

load absorption_spectra
abs1=tissue_abs(blood_con(1),so2(1),data.hb,data.hbo2,wtr(1),data.water,lpd(1),data.lipid,data.wavelength);

scattering=tissue_sca(a_Ray,a_Mie,b_Mie,data.wavelength);


axes(handles.axes3); 
cla;
    yyaxis left
    semilogy(data.wavelength,abs1);
    xlabel('Wavelength (nm)','FontSize',14)
    ylabel('Absorption Coefficient \mu_s'' (m^-^1)','FontSize',14)
hold on
    yyaxis right
    semilogy(data.wavelength,scattering);
    xlabel('Wavelength (nm)','FontSize',14)
    ylabel('Reduced Scattering Coefficient \mu_s'' (m^-^1)','FontSize',14)
%     axis fill
hold off;
title('Absorption and Reduced Scattering Coefficient','FontSize',14)
% % Axis labels
% xlabel('Wavelength (nm)','FontSize',14)
% ylabel('log_1_0  Absorption Coefficient (m^{-1})','FontSize',14)
% legend('Example 1','Example 2','Example 3','FontSize',14)

%%% axes handling
box off
xlim_Lower = 350;
xlim_Upper = 1050;
set(gca, 'xlim',[xlim_Lower xlim_Upper]);
set(gca, 'XTick', xlim_Lower+50:100:xlim_Upper);
set(gca, 'XTickLabel', xlim_Lower+50:100:xlim_Upper);

% ylim_Lower = 0;
% ylim_Upper = 13000;
% set(gca, 'ylim',[ylim_Lower ylim_Upper]);
% set(gca, 'YTick', ylim_Lower:1000:ylim_Upper);
% set(gca, 'YTickLabel', ylim_Lower:1000:ylim_Upper);

axes(handles.axes2);

muff=tissue_mueff(abs1,scattering);

if get(handles.checkbox1,'Value')==1; %
    % Plotting commands1
    semilogy(data.wavelength,muff,'k')    
else
    % Plotting commands1
    plot(data.wavelength,muff,'k')   
end
title('Tissue Effective Attenuation Coefficient','FontSize',14)

datacursormode on 

% Axis labels
xlabel('Wavelength (nm)','FontSize',14)
ylabel('Effective Attenuation Coefficient (m^{-1})','FontSize',14)


%%% axes handling
box off
xlim_Lower = edit3_Callback(handles.edit26);
xlim_Upper = edit3_Callback(handles.edit27);
set(gca, 'xlim',[xlim_Lower xlim_Upper]);
set(gca, 'XTick', xlim_Lower+15:50:xlim_Upper);
set(gca, 'XTickLabel', xlim_Lower+15:50:xlim_Upper);

% ylim_Lower = 0;
% ylim_Upper = 100;
% set(gca, 'ylim',[ylim_Lower ylim_Upper]);
% set(gca, 'YTick', ylim_Lower:20:ylim_Upper);
% set(gca, 'YTickLabel', ylim_Lower:20:ylim_Upper);

% --------------------------------------------------------------------
function FileMenu_Callback(hObject, eventdata, handles)
% hObject    handle to FileMenu (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)


% --------------------------------------------------------------------
function OpenMenuItem_Callback(hObject, eventdata, handles)
% hObject    handle to OpenMenuItem (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
file = uigetfile('*.fig');
if ~isequal(file, 0)
    open(file);
end

% --------------------------------------------------------------------
function PrintMenuItem_Callback(hObject, eventdata, handles)
% hObject    handle to PrintMenuItem (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
printdlg(handles.figure1)

% --------------------------------------------------------------------
function CloseMenuItem_Callback(hObject, eventdata, handles)
% hObject    handle to CloseMenuItem (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
selection = questdlg(['Close ' get(handles.figure1,'Name') '?'],...
                     ['Close ' get(handles.figure1,'Name') '...'],...
                     'Yes','No','Yes');
if strcmp(selection,'No')
    return;
end

delete(handles.figure1)


%% Blood Concentration Example 1
function input = edit1_Callback(hObject, eventdata, handles)
% hObject    handle to edit1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit1 as text
       input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit1_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


%% Blood Concentration Example 2
function input = edit2_Callback(hObject, eventdata, handles)
% hObject    handle to edit2 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit2 as text
%        str2double(get(hObject,'String')) returns contents of edit2 as a double
       input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit2_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit2 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


%% Blood Concentration Exmple 3
function input = edit3_Callback(hObject, eventdata, handles)
% hObject    handle to edit3 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit3 as text
%        str2double(get(hObject,'String')) returns contents of edit3 as a double
       input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end

% --- Executes during object creation, after setting all properties.
function edit3_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit3 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit4_Callback(hObject, eventdata, handles)
% hObject    handle to edit4 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit4 as text
%        str2double(get(hObject,'String')) returns contents of edit4 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit4_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit4 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit5_Callback(hObject, eventdata, handles)
% hObject    handle to edit5 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit5 as text
%        str2double(get(hObject,'String')) returns contents of edit5 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
% elseif input<0 || input > 100
%     errordlg('You must enter a different value','Invalid Input','modal')
%     uicontrol(hObject)
%     return
end


% --- Executes during object creation, after setting all properties.
function edit5_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit5 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit6_Callback(hObject, eventdata, handles)
% hObject    handle to edit6 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit6 as text
%        str2double(get(hObject,'String')) returns contents of edit6 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit6_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit6 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit7_Callback(hObject, eventdata, handles)
% hObject    handle to edit7 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit7 as text
%        str2double(get(hObject,'String')) returns contents of edit7 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit7_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit7 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit8_Callback(hObject, eventdata, handles)
% hObject    handle to edit8 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit8 as text
%        str2double(get(hObject,'String')) returns contents of edit8 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit8_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit8 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit9_Callback(hObject, eventdata, handles)
% hObject    handle to edit9 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit9 as text
%        str2double(get(hObject,'String')) returns contents of edit9 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit9_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit9 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit10_Callback(hObject, eventdata, handles)
% hObject    handle to edit10 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit10 as text
%        str2double(get(hObject,'String')) returns contents of edit10 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit10_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit10 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit11_Callback(hObject, eventdata, handles)
% hObject    handle to edit11 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit11 as text
%        str2double(get(hObject,'String')) returns contents of edit11 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit11_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit11 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit12_Callback(hObject, eventdata, handles)
% hObject    handle to edit12 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit12 as text
%        str2double(get(hObject,'String')) returns contents of edit12 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<0 || input > 100
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end


% --- Executes during object creation, after setting all properties.
function edit12_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit12 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


% --- Executes on button press in pushbutton2.
function pushbutton2_Callback(hObject, eventdata, handles)
% hObject    handle to pushbutton2 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
set(handles.edit1,'String','5');
set(handles.edit2,'String','500');


set(handles.edit4,'String','60');
set(handles.edit5,'String','2000');


set(handles.edit7,'String','65');
set(handles.edit8,'String','1');


set(handles.edit10,'String','15');


set(handles.edit26,'String','350');
set(handles.edit27,'String','1050');
pushbutton1_Callback(hObject, eventdata, handles)


%% min value in x-axis
function input = edit26_Callback(hObject, eventdata, handles)
% hObject    handle to edit26 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit26 as text
%        str2double(get(hObject,'String')) returns contents of edit26 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<260 || input > 1590
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end
pushbutton1_Callback(hObject, eventdata, handles)

% --- Executes during object creation, after setting all properties.
function edit26_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit26 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end



function input = edit27_Callback(hObject, eventdata, handles)
% hObject    handle to edit27 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hints: get(hObject,'String') returns contents of edit27 as text
%        str2double(get(hObject,'String')) returns contents of edit27 as a double
    input = str2double(get(hObject,'String')); %returns contents of edit1 as a double
if isnan(input)
    errordlg('You must enter a numeric value','Invalid Input','modal')
    uicontrol(hObject)
    return
elseif input<260 || input > 1590
    errordlg('You must enter a different value','Invalid Input','modal')
    uicontrol(hObject)
    return
end
pushbutton1_Callback(hObject, eventdata, handles)

% --- Executes during object creation, after setting all properties.
function edit27_CreateFcn(hObject, eventdata, handles)
% hObject    handle to edit27 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    empty - handles not created until after all CreateFcns called

% Hint: edit controls usually have a white background on Windows.
%       See ISPC and COMPUTER.
if ispc && isequal(get(hObject,'BackgroundColor'), get(0,'defaultUicontrolBackgroundColor'))
    set(hObject,'BackgroundColor','white');
end


% --- Executes on button press in checkbox1.
function input = checkbox1_Callback(hObject, eventdata, handles)
% hObject    handle to checkbox1 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)

% Hint: get(hObject,'Value') returns toggle state of checkbox1
input = get(hObject,'Value');
pushbutton1_Callback(hObject, eventdata, handles)


% --- Executes on button press in pushbutton3.
function pushbutton3_Callback(hObject, eventdata, handles)
% hObject    handle to pushbutton3 (see GCBO)
% eventdata  reserved - to be defined in a future version of MATLAB
% handles    structure with handles and user data (see GUIDATA)
main
close(GUI_tissue_mueff)
