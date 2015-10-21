////////////////////////////////////////////////////////////////////////
// applican.js
// Version 1.12.0
//
// Copyright (c) 2013-2015 Newphoria Corporation. All rights reserved.
////////////////////////////////////////////////////////////////////////
var applican = null;

var ApplicanError = function() {};
ApplicanError.DEVICE_BUSY_ERR = 'DEVICE_BUSY_ERR';

var LocalNotificationError = function() {};
LocalNotificationError.ILLEGAL_PARAMETER = 'ILLEGAL_PARAMETER';
LocalNotificationError.NOTIFICATIO_BUSY_ERR = 'NOTIFICATIO_BUSY_ERR';

var CompassError = function() {};
CompassError.COMPASS_INTERNAL_ERR = 'COMPASS_INTERNAL_ERR';
CompassError.COMPASS_NOT_SUPPORTED = 'COMPASS_NOT_SUPPORTED';
CompassError.COMPASS_BUSY_ERR = 'COMPASS_BUSY_ERR';

var PositionError = function() {};
PositionError.PERMISSION_DENIED = 'PERMISSION_DENIED';
PositionError.POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE';
PositionError.TIMEOUT = 'TIMEOUT';
PositionError.POSITION_BUSY_ERR = 'POSITION_BUSY_ERR';

var ListError = function() {};
ListError.CANCELED = 'CANCELED';
ListError.BUSY = 'BUSY';

var WiFiError = function() {};
WiFiError.PERMISSION_DENIED = 'PERMISSION_DENIED';
WiFiError.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
WiFiError.DISCONNECT = 'DISCONNECT';
WiFiError.ILLEGAL_PARAMETER = 'ILLEGAL_PARAMETER';
WiFiError.CONNECT_FAILED = 'CONNECT_FAILED';
WiFiError.NOT_SUPPORTED = 'NOT_SUPPORTED';
WiFiError.BUSY = 'BUSY';

var WiFiStatus = function() {};
WiFiStatus.WIFI_ON = 'WIFI_ON';
WiFiStatus.WIFI_OFF = 'WIFI_OFF';

var VideoError = function() {};
VideoError.NOT_FOUND_ERR = 'NOT_FOUND_ERR';
VideoError.CANCELED = 'CANCELED';
VideoError.BUSY = 'BUSY';

var CaptureError = function() {};
CaptureError.CAPTURE_INTERNAL_ERR = 0;
CaptureError.CAPTURE_APPLICATION_BUSY = 1;
CaptureError.CAPTURE_INVALID_ARGUMENT = 2;
CaptureError.CAPTURE_NO_MEDIA_FILES = 3;
CaptureError.CAPTURE_NOT_SUPPORTED = 20;
CaptureError.CAPTURE_BUSY = 30;

var GameSoundError = function() {};
GameSoundError.INVALID_DATA = 1;
GameSoundError.ILLEGAL_TRACK = 2;
GameSoundError.NOW_LOADING = 3;
GameSoundError.BUSY_ERROR = 4;

var GlobalizationError = function() {};
GlobalizationError.UNKNOWN_ERROR  = 0;
GlobalizationError.FORMATTING_ERROR  = 1;
GlobalizationError.PARSING_ERROR  = 2;
GlobalizationError.PATTERN_ERROR  = 3;
GlobalizationError.BUSY_ERROR  = 30;

var AppCError = function() {};
AppCError.UNKNOWN_ERROR = 1;
AppCError.SETTING_ERROR = 2;
AppCError.BUSY_ERROR = 3;

var PurchaseError = function() {};
PurchaseError.UNKNOWN_ERROR = 0;
PurchaseError.INVALID_ARGUMENT = 1;
PurchaseError.BUSY = 2;
PurchaseError.NOT_SUPPORTED = 3;
PurchaseError.CANCELED = 4;
PurchaseError.ALREADY_OWNED = 5;
PurchaseError.NOT_OWNED = 6;

var BluetoothError = function() {};
BluetoothError.BUSY_ERROR = 'BUSY_ERROR';
BluetoothError.BLUETOOT_NOT_SUPPORTED = 'BLUETOOT_NOT_SUPPORTED';
BluetoothError.UNKNOWN_ERROR = 'UNKNOWN_ERROR';
BluetoothError.BLUETOOT_DISABLED = 'BLUETOOT_DISABLED';

var LauncherError = function() {};
LauncherError.BUSY_ERROR = 'BUSY_ERROR';
LauncherError.NOT_FOUND = 'NOT_FOUND';

var InfosoundError = function() {};
InfosoundError.CodeNoError = 0;
InfosoundError.CodeNotInitialized = 1;
InfosoundError.CodeAlreadyInitialized = 2;
InfosoundError.CodeRecordingInProgress = 3;
InfosoundError.CodeRecordingNotStarted = 4;
InfosoundError.CodeInternalError = 5;
InfosoundError.CodeInterrupted = 6;
InfosoundError.CodeTagIDFailure = 7;
InfosoundError.CodeRecordingAbort = 8;
InfosoundError.CodeContentType = 9;
InfosoundError.CodeContentNotFound = 10;
InfosoundError.CodeContentForbidden = 11;
InfosoundError.CodeContentNull = 12;
InfosoundError.CodeConnectionTimeout = 13;
InfosoundError.CodeConnectionOthers = 14;

var UtilitiesError = function() {};
UtilitiesError.NOT_FOUND_ERR = 'NOT_FOUND_ERR';
UtilitiesError.UNZIP_INVALID_PATH = 1;
UtilitiesError.UNZIP_UNZIP_ERROR = 2;

/////////////////////////////////
//File関連オブジェクト

// ----------------------------------------
// File
// http://doc.applican.com/RequestFileSystem/index.html
// ----------------------------------------

var FileSystem = function(name, root) {
    this.name = name || null;
    if (root) {
        this.root = new DirectoryEntry(root.name, root.fullPath);
    }
};

var LocalFileSystem = function() {
};
LocalFileSystem.TEMPORARY = 0; //temporary, with no guarantee of persistence
LocalFileSystem.PERSISTENT = 1; //persistent


/*
function Entry(isFile, isDirectory, name, fullPath, fileSystem) {
    this.isFile = !!isFile;
    this.isDirectory = !!isDirectory;
    this.name = name || '';
    this.fullPath = fullPath || '';
    this.filesystem = fileSystem || null;
}
Entry.prototype.getMetadata = function(successCallback, errorCallback) {
};
Entry.prototype.setMetadata = function(successCallback, errorCallback, metadataObject) {
};
Entry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
};
Entry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
};
Entry.prototype.toURL = function() {
    return this.fullPath;
};
Entry.prototype.toURI = function(mimeType) {
    return this.toURL();
};
Entry.prototype.remove = function(successCallback, errorCallback) {
};
Entry.prototype.getParent = function(successCallback, errorCallback) {
};
*/

/*
var Metadata = function(time) {
    this.modificationTime = (typeof time != 'undefined'?new Date(time):null);
};
*/

var DirectoryEntry = function(name, fullPath) {
	this.name = name;
	this.fullPath = fullPath;
	this.isFile = false;
	this.isDirectory = true;
	this.filesystem = null;
};
DirectoryEntry.prototype.createReader = function() {
    return new DirectoryReader(this.fullPath);
};
DirectoryEntry.prototype.getDirectory = function(path, options, successCallback, errorCallback) {
	if(options===null) options={};
	options.path = path;
	options.fullPath = this.fullPath;

	var success = function(result){
		var directoryEntry = new DirectoryEntry(result.name, result.fullPath);
		successCallback(directoryEntry);
	};

	if(applican.config.debug){
		var directoryEntry = new DirectoryEntry("name", "fullPath");
		successCallback(directoryEntry);
	}else{
		var scheme = 'applican-api://file/getDirectory/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
DirectoryEntry.prototype.remove = function(successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;

	if(applican.config.debug){
		successCallback();
	}else{
		var scheme = 'applican-api://file/remove/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};
DirectoryEntry.prototype.removeRecursively = function(successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;

	if(applican.config.debug){
		successCallback();
	}else{
		var scheme = 'applican-api://file/removeRecursively/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};
DirectoryEntry.prototype.getFile = function(path, options, successCallback, errorCallback) {
	if(options===null) options={};
	options.filePath = path;
	options.fullPath = this.fullPath;

	var success = function(result){
		var fileEntry = new FileEntry(result.name, result.fullPath);
		successCallback(fileEntry);
	};

	if(applican.config.debug){
		var fileEntry = new FileEntry('name', 'fullPath');
		successCallback(fileEntry);
	}else{
		var scheme = 'applican-api://file/getFile/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
/*
DirectoryEntry.prototype.getMetadata = function(successCallback, errorCallback) {
};
DirectoryEntry.prototype.setMetadata = function(successCallback, errorCallback, metadataObject) {
};
*/
DirectoryEntry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;
	options.parentPath = parent.fullPath;
	options.newName = newName;
	
	if(newName===null || newName===""){
		options.newName = this.name;
	}

	var success = function(result){
		var dir = new DirectoryEntry(result.name, result.fullPath);
		successCallback(dir);
	};
	
	if(applican.config.debug){
		var dir = new DirectoryEntry('name', 'fullPath');
		successCallback(dir);
	}else{
		var scheme = 'applican-api://file/moveTo/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
DirectoryEntry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;
	options.parentPath = parent.fullPath;
	options.newName = newName;
	
	if(newName===null || newName===""){
		options.newName = this.name;
	}

	var success = function(result){
		var dir = new DirectoryEntry(result.name, result.fullPath);
		successCallback(dir);
	};
	
	if(applican.config.debug){
		var dir = new DirectoryEntry('name', 'fullPath');
		successCallback(dir);
	}else{
		var scheme = 'applican-api://file/copyTo/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
DirectoryEntry.prototype.toURL = function() {
    return this.fullPath;
};
DirectoryEntry.prototype.getParent = function(successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;

	var success = function(result){
		var dir = new DirectoryEntry(result.name, result.fullPath);
		successCallback(dir);
	};
	
	if(applican.config.debug){
		var dir = new DirectoryEntry('name', 'fullPath');
		successCallback(dir);
	}else{
		var scheme = 'applican-api://file/getParent/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};





function DirectoryReader(path) {
    this.path = path || null;
}
DirectoryReader.prototype.readEntries = function(successCallback, errorCallback) {
	var options = {path:this.path};
	var success = function(result){
		var retVal = [];
		for (var i=0; i<result.length; i++) {
            var entry = null;
            if (result[i].isDirectory) {
                entry = new DirectoryEntry('', '');
            }
            else if (result[i].isFile) {
                entry = new FileEntry('', '');
            }
            entry.isDirectory = result[i].isDirectory;
            entry.isFile = result[i].isFile;
            entry.name = result[i].name;
            entry.fullPath = result[i].fullPath;
            retVal.push(entry);
        }
		successCallback(retVal);
	};
	
	if(applican.config.debug){
		var retVal = [];
		var entry = new FileEntry('hoge_file', 'hogehoge');
		retVal.push(entry);
		entry = new DirectoryEntry('hoge_dir', 'hogehoge');
		retVal.push(entry);
		successCallback(retVal);
	}else{
		var scheme = 'applican-api://file/readEntries/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};


var FileEntry = function(name, fullPath) {
	this.name = name;
	this.fullPath = fullPath;
	this.isFile = true;
	this.isDirectory = false;
};
FileEntry.prototype.createWriter = function(successCallback, errorCallback) {
	var options = {name:this.name, fullPath:this.fullPath};
	var success = function(result){
		var file = new File(result.name, result.fullPath, result.type, result.lastModifiedDate, result.size);
		var fileWriter = new FileWriter(file);
		successCallback(fileWriter);
	};
	
	if(applican.config.debug){
		var file = new File('name', 'fullPath', 'type', 'lastModifiedDate', 0);
		var fileWriter = new FileWriter(file);
		successCallback(fileWriter);
	}else{
		var scheme = 'applican-api://file/createWriter/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileEntry.prototype.file = function(successCallback, errorCallback) {
	var options = {name:this.name, fullPath:this.fullPath};
	var success = function(result){
		var file = new File(result.name, result.fullPath, result.type, result.lastModifiedDate, result.size);
		successCallback(file);
	};
	
	if(applican.config.debug){
		var file = new File('name', 'fullPath', 'type', 'lastModifiedDate', 0);
		successCallback(file);
	}else{
		var scheme = 'applican-api://file/file/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileEntry.prototype.remove = function(successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;

	if(applican.config.debug){
		successCallback();
	}else{
		var scheme = 'applican-api://file/remove/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};
/*
FileEntry.prototype.getMetadata = function(successCallback, errorCallback) {
};
FileEntry.prototype.setMetadata = function(successCallback, errorCallback, metadataObject) {
};
*/
FileEntry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;
	options.parentPath = parent.fullPath;
	options.newName = newName;
	
	if(newName===null || newName===""){
		options.newName = this.name;
	}

	var success = function(result){
		var file = new File(result.name, result.fullPath, result.type, result.lastModifiedDate, result.size);
		successCallback(file);
	};
	
	if(applican.config.debug){
		var file = new File('name', 'fullPath', 'type', 'lastModifiedDate', 0);
		successCallback(file);
	}else{
		var scheme = 'applican-api://file/moveTo/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileEntry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;
	options.parentPath = parent.fullPath;
	options.newName = newName;
	
	if(newName===null || newName===""){
		options.newName = this.name;
	}

	var success = function(result){
		var file = new File(result.name, result.fullPath, result.type, result.lastModifiedDate, result.size);
		successCallback(file);
	};
	
	if(applican.config.debug){
		var file = new File('name', 'fullPath', 'type', 'lastModifiedDate', 0);
		successCallback(file);
	}else{
		var scheme = 'applican-api://file/copyTo/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileEntry.prototype.toURL = function() {
    return this.fullPath;
};
FileEntry.prototype.getParent = function(successCallback, errorCallback) {
	var options={};
	options.fullPath = this.fullPath;

	var success = function(result){
		var dir = new DirectoryEntry(result.name, result.fullPath);
		successCallback(dir);
	};
	
	if(applican.config.debug){
		var dir = new DirectoryEntry('name', 'fullPath');
		successCallback(dir);
	}else{
		var scheme = 'applican-api://file/getParent/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};



var File = function(name, fullPath, type, lastModifiedDate, size){
    this.name = name || '';
    this.fullPath = fullPath || null;
    this.type = type || null;
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;

    this.start = 0;
    this.end = this.size;
};

/*
File.prototype.slice = function(start, end) {
};
*/

var FileWriter = function(file) {
    this.fileName = "";
    this.length = 0;
    if (file) {
        this.fileName = file.fullPath || file;
        this.length = file.size || 0;
    }

    this.position = 0;

    this.readyState = 0;

    this.result = null;

    this.error = null;


    this.onwritestart = null;
    this.onprogress = null;
    this.onwrite = null;
    this.onwriteend = null;
    this.onabort = null;
    this.onerror = null;
};

FileWriter.INIT = 0;
FileWriter.WRITING = 1;
FileWriter.DONE = 2;
FileWriter.prototype.abort = function() {
};
FileWriter.prototype.write = function(text) {
	var options = {text:text, position:this.position, fileName:this.fileName, length:this.length};
	
	var me = this;
	var success = function(result){
		if(result.status=='writeend'){
			if(me.onwriteend!==null){
				me.onwriteend(result);
			}
		}else if(result.status=='writestart'){
			if(me.onwritestart!==null){
				me.onwritestart(result);
			}
		}else if(result.status=='error'){
			if(me.onerror!==null){
				me.onerror(result);
			}
		}else if(result.status=='progress'){	// 現在サポートされていません
			if(me.onprogress!==null){
				me.onprogress(result);
			}
		}else if(result.status=='write'){
			if(me.onwrite!==null){
				me.onwrite(result);
			}
		}else if(result.status=='abort'){
			if(me.onabort!==null){
				me.onabort(result);
			}
		}
	};
	
	if(applican.config.debug){
		if(me.onwriteend!==null){
			me.onwriteend(null);
		}
	}else{
		var scheme = 'applican-api://file/write/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, this.onerror);
	}
};
/*
FileWriter.prototype.seek = function(offset) {
};
FileWriter.prototype.truncate = function(size) {
};
*/

var FileReader = function() {
    this._readyState = 0;
    this._error = null;
    this._result = null;
    this._fileName = '';
};

// States
FileReader.EMPTY = 0;
FileReader.LOADING = 1;
FileReader.DONE = 2;


FileReader.prototype.readAsText = function(file, encoding) {
	var options = {fullPath:file.fullPath, encoding:encoding};

	var me = this;
	var success = function(result){
		if(result.status=='loadend'){
			if(me.onloadend!==null){
				me.onloadend({target:{result:result.result}});
			}
		}else if(result.status=='loadstart'){
			if(me.onloadstart!==null){
				me.onloadstart(result);
			}
		}else if(result.status=='error'){
			if(me.onerror!==null){
				me.onerror(result);
			}
		}else if(result.status=='progress'){	// 現在サポートされていません
			if(me.onprogress!==null){
				me.onprogress(result);
			}

		}else if(result.status=='load'){
			if(me.onload!==null){
				me.onload({target:{result:result.result}});
			}
		}else if(result.status=='abort'){
			if(me.onabort!==null){
				me.onabort(result);
			}
		}
	};

	
	if(applican.config.debug){
		if(me.onloadend!==null){
			me.onloadend({target:{result:"result"}});
		}
	}else{
		var scheme = 'applican-api://file/readAsText/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, this.onerror);
	}
	
};
FileReader.prototype.readAsDataURL = function(file) {
	var options = {fullPath:file.fullPath};
	var me = this;
	var success = function(result){
		if(result.status=='loadend'){
			if(me.onloadend!==null){
				var evt = {target:{result:result.result}};
				me.onloadend(evt);
			}
		}
	};
	
	if(applican.config.debug){
		if(me.onloadend!==null){
			var evt = {target:{result:"result"}};
			me.onloadend(evt);
		}
	}else{
		var scheme = 'applican-api://file/readAsDataURL/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, this.onerror);
	}
};
FileReader.prototype.abort = function() {
};
FileReader.prototype.readAsBinaryString = function(/*file*/) {
    this.abort();
};
FileReader.prototype.readAsArrayBuffer = function(/*file*/) {
    this.abort();
};






function FileError(error) {
  this.code = error || null;
}

FileError.NOT_FOUND_ERR = 1;
FileError.SECURITY_ERR = 2;
FileError.ABORT_ERR = 3;

FileError.NOT_READABLE_ERR = 4;
FileError.ENCODING_ERR = 5;
FileError.NO_MODIFICATION_ALLOWED_ERR = 6;
FileError.INVALID_STATE_ERR = 7;
FileError.SYNTAX_ERR = 8;
FileError.INVALID_MODIFICATION_ERR = 9;
FileError.QUOTA_EXCEEDED_ERR = 10;
FileError.TYPE_MISMATCH_ERR = 11;
FileError.PATH_EXISTS_ERR = 12;




var FileTransfer = function() {
    this._id = ++applican.idCounter;
    this.onprogress = null; // optional callback
};

FileTransfer.prototype.upload = function(filePath, server, successCallback, errorCallback, options, trustAllHosts) {
	if(typeof options == 'undefined' || options===null) options={};
	options.filePath = filePath;
	options.server = server;
	options.id = this._id;
	if(typeof trustAllHosts != 'undefined') options.trustAllHosts = trustAllHosts;

	var me = this;
	var success = function(result){
		if(result.status=="success"){
			successCallback(result);
		}else if(result.status=="progress"){
			if(me.onprogress!==null){
				var evt = new ProgressEvent(result.total, result.loaded);
				me.onprogress(evt);
			}
		}
	};
	
	if(applican.config.debug){
		successCallback({responseCode:200, response:'response', bytesSent:123});
	}else{
		var scheme = 'applican-api://file/upload/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileTransfer.prototype.download = function(source, target, successCallback, errorCallback, trustAllHosts) {
	var options={};
	options.source = source;
	options.target = target;
	options.id = this._id;
	options.trustAllHosts = trustAllHosts;

	var me = this;
	var success = function(result){
		if(result.status=="success"){
			var entry = new FileEntry(result.name, result.fullPath);
			successCallback(entry);
		}else if(result.status=="progress"){
			if(me.onprogress!==null){
				var evt = new ProgressEvent(result.total, result.loaded);
				me.onprogress(evt);
			}
		}
	};

	if(applican.config.debug){
		var entry = new FileEntry("name", "fullPath");
		successCallback(entry);
	}else{
		var scheme = 'applican-api://file/download/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};
FileTransfer.prototype.abort = function(successCallback, errorCallback) {
	var options={};
	options.id = this._id;

	if(applican.config.debug){
		successCallback(null);
	}else{
		var scheme = 'applican-api://file/ft_abort/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};

var FileTransferError = function(code, source, target, status, body) {
    this.code = code || null;
    this.source = source || null;
    this.target = target || null;
    this.http_status = status || null;
    this.body = body || null;
};

FileTransferError.FILE_NOT_FOUND_ERR = 1;
FileTransferError.INVALID_URL_ERR = 2;
FileTransferError.CONNECTION_ERR = 3;
FileTransferError.ABORT_ERR = 4;


var FileUploadOptions = function(fileKey, fileName, mimeType, params, headers) {
    this.fileKey = fileKey || null;
    this.fileName = fileName || null;
    this.mimeType = mimeType || null;
    this.params = params || null;
    this.headers = headers || null;
};

var FileUploadResult = function() {
    this.bytesSent = 0;
    this.responseCode = null;
    this.response = null;
};


var ProgressEvent = function(total, loaded) {
	this.lengthComputable = false;
    this.loaded = loaded;
    this.total = total;

	if(total>0) this.lengthComputable = true;
};



	
var Media = function(src, successCallback, errorCallback, statusCallback, options) {
	this._id = ++applican.mediaCounter;

    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this._duration = -1;
    this._position = -1;
	
	this._callbackId = -1;
	
	this._audio = null;
	

	//var options={};
	if(typeof options == 'undefined' || options===null) options={};
	options.src = src;
	options.id = this._id;
	
	var me = this;
	var success = function(result){
		if(result.status=="success"){
			me._duration = result.duration/1000.0;
			successCallback();
		}else if(result.status=="status_change"){
			statusCallback(result.code);
		}
	};

	if(applican.config.debug){
		this._audio = new Audio();
		this._audio.addEventListener("canplaythrough", function(){
			me._duration = me._audio.duration;
			successCallback();
		}, false);
		this._audio.src = src;
	}else{
		var scheme = 'applican-api://media/create/'+encodeURIComponent(JSON.stringify(options));
		this._callbackId = applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
};

// Media messages
Media.MEDIA_STATE = 1;
Media.MEDIA_DURATION = 2;
Media.MEDIA_POSITION = 3;
Media.MEDIA_ERROR = 9;

// Media states
Media.MEDIA_NONE = 0;
Media.MEDIA_STARTING = 1;
Media.MEDIA_RUNNING = 2;
Media.MEDIA_PAUSED = 3;
Media.MEDIA_STOPPED = 4;
Media.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];

//Media.get = function(id) {};


Media.prototype.play = function(options) {
	if(typeof options == 'undefined' || options===null) options={};
	options.id = this._id;
		
	if(applican.config.debug){
		this._audio.play();
	}else{
		var scheme = 'applican-api://media/play/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};

Media.prototype.playBackground = function(options) {
	if(typeof options == 'undefined' || options===null) options={};
	options.id = this._id;
		
	if(applican.config.debug){
		this._audio.play();
	}else{
		var scheme = 'applican-api://media/playBackground/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};

Media.prototype.stop = function() {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){
		this._audio.pause();
		this._audio.currentTime=0;
	}else{
		var scheme = 'applican-api://media/stop/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};


Media.prototype.seekTo = function(milliseconds) {
	var options={};
	options.id = this._id;
	options.milliseconds = milliseconds;
	
	if(applican.config.debug){
		this._audio.currentTime=milliseconds/1000.0;
	}else{
		var scheme = 'applican-api://media/seekTo/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};

Media.prototype.pause = function() {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){
		this._audio.pause();
	}else{
		var scheme = 'applican-api://media/pause/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};


Media.prototype.getDuration = function() {
	if(applican.config.debug){
		return this._audio.duration;
	}else{
		return this._duration;
	}
};

Media.prototype.getCurrentPosition = function(successCallback, errorCallback) {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){
		successCallback(this._audio.currentTime);
	}else{
		var scheme = 'applican-api://media/getCurrentPosition/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};


Media.prototype.startRecord = function() {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){

	}else{
		var scheme = 'applican-api://media/startRecord/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};


Media.prototype.stopRecord = function() {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){

	}else{
		var scheme = 'applican-api://media/stopRecord/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};


Media.prototype.release = function() {
	var options={};
	options.id = this._id;
	
	if(applican.config.debug){
		this._audio = null;
	}else{
		var scheme = 'applican-api://media/release/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
		
		delete this.callbacks[this._callbackId];
	}
};


Media.prototype.setVolume = function(volume) {
	var options={};
	options.id = this._id;
	options.volume = volume;
	
	if(applican.config.debug){
		this._audio.volume  = volume;
	}else{
		var scheme = 'applican-api://media/volume/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme);
	}
};

/*
Media.onStatus = function(id, msgType, value) {
};
*/




// ----------------------------------------
// Contact
// http://doc.applican.com/Contacts/index.html
// ----------------------------------------
var Contact = function (id, displayName, name, nickname, phoneNumbers, emails, addresses,
    ims, organizations, birthday, note, photos, categories, urls) {
    this.id = id || null;
    this.rawId = null;
    this.displayName = displayName || null;
    this.name = name || null; // ContactName
    this.nickname = nickname || null;
    this.phoneNumbers = phoneNumbers || null; // ContactField[]
    this.emails = emails || null; // ContactField[]
    this.addresses = addresses || null; // ContactAddress[]
    this.ims = ims || null; // ContactField[]
    this.organizations = organizations || null; // ContactOrganization[]
    this.birthday = birthday || null;
    this.note = note || null;
    this.photos = photos || null; // ContactField[]
    this.categories = categories || null; // ContactField[]
    this.urls = urls || null; // ContactField[]
};


Contact.prototype._setData = function(data) {
	if(typeof data.id != 'undefined') this.id = data.id;
	if(typeof data.displayName != 'undefined') this.displayName = data.displayName;
	if(typeof data.nickname != 'undefined') this.nickname = data.nickname;
	if(typeof data.birthday != 'undefined'){
		this.birthday = new Date(Date.parse(data.birthday));
	}
	if(typeof data.note != 'undefined') this.note = data.note;

	if(typeof data.name != 'undefined') this.name = new ContactName(
		data.name.formatted, data.name.familyName, data.name.givenName, data.name.middle, data.name.prefix, data.name.suffix);

	if(typeof data.addresses != 'undefined') this.addresses = this._purseAddresses(data.addresses);
	if(typeof data.organizations != 'undefined') this.organizations = this._purseOrganizations(data.organizations);

	if(typeof data.phoneNumbers != 'undefined') this.phoneNumbers = this._purseFields(data.phoneNumbers);
	if(typeof data.emails != 'undefined') this.emails = this._purseFields(data.emails);
	if(typeof data.ims != 'undefined') this.ims = this._purseFields(data.ims);
	if(typeof data.photos != 'undefined') this.photos = this._purseFields(data.photos);
	if(typeof data.categories != 'undefined') this.categories = this._purseFields(data.categories);
	if(typeof data.urls != 'undefined') this.urls = this._purseFields(data.urls);
};

Contact.prototype._purseFields = function(data) {
	var result = [];
	var cnt = data.length;
	if(cnt>0){
		for(var i=0; i<cnt; i++){
			var conField = new ContactField(data[i].type, data[i].value, data[i].pref);
			result.push(conField);
		}
	}
	return result;
};


Contact.prototype._purseAddresses = function(data) {
	var result = [];
	var cnt = data.length;
	if(cnt>0){
		for(var i=0; i<cnt; i++){
			var conAddresse = new ContactAddress(data[i].pref, data[i].type, data[i].formatted, data[i].streetAddress,
				data[i].locality, data[i].region, data[i].postalCode, data[i].country);
			result.push(conAddresse);
		}
	}
	return result;
};


Contact.prototype._purseOrganizations = function(data) {
	var result = [];
	var cnt = data.length;
	if(cnt>0){
		for(var i=0; i<cnt; i++){
			var conOrganization = new ContactOrganization(data[i].pref, data[i].type, data[i].name, data[i].department, data[i].title);
			result.push(conOrganization);
		}
	}
	return result;
};


Contact.prototype.remove = function(successCallback, errorCallback) {
	var options={};
	options.id = this.id;

	if(applican.config.debug){
		successCallback();
	}else{
		var scheme = 'applican-api://contacts/remove/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};

Contact.prototype.clone = function() {
	var tmp = {};
	tmp.displayName = this.displayName;
	tmp.nickname = this.nickname;
	tmp.note = this.note;
	if(this.name!==null) tmp.name = JSON.parse(JSON.stringify(this.name));
	if(this.phoneNumbers!==null) tmp.phoneNumbers = JSON.parse(JSON.stringify(this.phoneNumbers));
	if(this.emails!==null) tmp.emails = JSON.parse(JSON.stringify(this.emails));
	if(this.addresses!==null) tmp.addresses = JSON.parse(JSON.stringify(this.addresses));
	if(this.ims!==null) tmp.ims = JSON.parse(JSON.stringify(this.ims));
	if(this.organizations!==null) tmp.organizations = JSON.parse(JSON.stringify(this.organizations));
	if(this.photos!==null) tmp.photos = JSON.parse(JSON.stringify(this.photos));
	if(this.categories!==null) tmp.categories = JSON.parse(JSON.stringify(this.categories));
	if(this.urls!==null) tmp.urls = JSON.parse(JSON.stringify(this.urls));

	if(this.birthday!==null){
		var yy = this.birthday.getYear();
		var mm = this.birthday.getMonth() + 1;
		var dd = this.birthday.getDate();
		if (yy < 2000) { yy += 1900; }
		if (mm < 10) { mm = "0" + mm; }
		if (dd < 10) { dd = "0" + dd; }
		tmp.birthday = yy + "/" + mm + "/" + dd +" 00:00:00";
	}

	var newContact = new Contact();
	newContact._setData(tmp);
	
	return newContact;
};

Contact.prototype.save = function(successCallback, errorCallback) {
	var options={};
	options.id = this.id;
	options.displayName = this.displayName;
	options.name = this.name;
	options.nickname = this.nickname;
	options.phoneNumbers = this.phoneNumbers;
	options.emails = this.emails;
	options.addresses = this.addresses;
	options.ims = this.ims;
	options.organizations = this.organizations;
	
	if(typeof this.birthday != 'undefined' && this.birthday!==null){
		var yy = this.birthday.getYear();
		var mm = this.birthday.getMonth() + 1;
		var dd = this.birthday.getDate();
		if (yy < 2000) { yy += 1900; }
		if (mm < 10) { mm = "0" + mm; }
		if (dd < 10) { dd = "0" + dd; }
		options.birthday = yy + "/" + mm + "/" + dd;
	}else{
		options.birthday = null;
	}
	
	options.note = this.note;
	options.photos = this.photos;
	options.categories = this.categories;
	options.urls = this.urls;

	var success = function(/*result*/){
		successCallback();
	};
	
	if(applican.config.debug){
		successCallback();
	}else{
		var scheme = 'applican-api://contacts/save/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, success, errorCallback);
	}
	
	
};

var ContactFindOptions = function(filter, multiple) {
    this.filter = filter || '';
    this.multiple = (typeof multiple != 'undefined' ? multiple : false);
};

var ContactError = function(err) {
    this.code = (typeof err != 'undefined' ? err : null);
};
ContactError.UNKNOWN_ERROR = 0;
ContactError.INVALID_ARGUMENT_ERROR = 1;
ContactError.TIMEOUT_ERROR = 2;
ContactError.PENDING_OPERATION_ERROR = 3;
ContactError.IO_ERROR = 4;
ContactError.NOT_SUPPORTED_ERROR = 5;
ContactError.PERMISSION_DENIED_ERROR = 20;
ContactError.CONTACT_BUSY = 30;


var ContactName = function(formatted, familyName, givenName, middle, prefix, suffix) {
    this.formatted = formatted || null;
    this.familyName = familyName || null;
    this.givenName = givenName || null;
    this.middleName = middle || null;
    this.honorificPrefix = prefix || null;
    this.honorificSuffix = suffix || null;
};


var ContactField = function(type, value, pref) {
    this.id = null;
    this.type = (type && type.toString()) || null;
    this.value = (value && value.toString()) || null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
};

var ContactAddress = function(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.formatted = formatted || null;
    this.streetAddress = streetAddress || null;
    this.locality = locality || null;
    this.region = region || null;
    this.postalCode = postalCode || null;
    this.country = country || null;
};


var ContactOrganization = function(pref, type, name, dept, title) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.name = name || null;
    this.department = dept || null;
    this.title = title || null;
};





// ----------------------------------------
// Database
// http://doc.applican.com/OpenDatabase/index.html
// ----------------------------------------
var _Database = function(name) {
	this.name = name;
};

_Database.prototype.exec = function(sql, successCallback, errorCallback) {
	var options={name:this.name, sql:sql};
	
	if(applican.config.debug){
		successCallback(1);
	}else{
		var scheme = 'applican-api://db/exec/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};
_Database.prototype.execTransaction = function(sqls, successCallback, errorCallback) {
	var options={name:this.name, sqls:sqls};
	
	if(applican.config.debug){
		successCallback(1);
	}else{
		var scheme = 'applican-api://db/execTransaction/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};

_Database.prototype.query = function(sql, successCallback, errorCallback) {
	var options={name:this.name, sql:sql};
	
	if(applican.config.debug){
		successCallback(1);
	}else{
		var scheme = 'applican-api://db/query/'+encodeURIComponent(JSON.stringify(options));
		applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	}
};



(function() {

/////////////////////////
//排他制御
var Queue = function() {
	this.pf_schemeQueue = [];
	this.pf_last_call_api_time = 0;
	this.PF_QUEUE_INTERVAL = 50;
	this.is_wait = false;
	
	this.pf_callApi = function(scheme, callbackStack, success, fail){
		var _callbackId = -1;
		var current_time = (new Date()).getTime();
		
		if(typeof callbackStack != 'undefined'){
			applican.callbackId++;
			applican.callbacks[applican.callbackId] = {success:success, fail:fail};
			scheme += "#callbackId_"+applican.callbackId;
			_callbackId = applican.callbackId;
		}

		if(current_time-this.pf_last_call_api_time<this.PF_QUEUE_INTERVAL){
			this.pf_schemeQueue.push(scheme);
			if(!this.is_wait){
				this.is_wait = true;
				setTimeout(function(){ applican.queue.pf_callSchemeQueue(); }, this.PF_QUEUE_INTERVAL);
			}
			return _callbackId;
		}

		this.pf_last_call_api_time = current_time;
		location.href = scheme;
		return _callbackId;
	};

	this.pf_callSchemeQueue = function(){
		if(this.pf_schemeQueue.length<1){
			this.is_wait = false;
			return;
		}
		
		var scheme = this.pf_schemeQueue[0];

		var current_time = (new Date()).getTime();
		if(current_time-this.pf_last_call_api_time>=this.PF_QUEUE_INTERVAL){
			this.pf_last_call_api_time = current_time;
			this.pf_schemeQueue.shift();
			location.href = scheme;
			
			if(this.pf_schemeQueue.length>0){
				this.is_wait = true;
				setTimeout(function(){ applican.queue.pf_callSchemeQueue(); }, this.PF_QUEUE_INTERVAL);
			}else{
				this.is_wait = false;
			}
		}else{
			this.is_wait = true;
			setTimeout(function(){ applican.queue.pf_callSchemeQueue(); }, this.PF_QUEUE_INTERVAL);
		}
	};
};

//型を取得
function getObjectClassType(obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return clas;
}

//Stringにキャストする
function castToString(obj){
	if(getObjectClassType(obj)!="String"){
		return String(obj);
	}else{
		return obj;
	}
}

/////////////////////////
//バーコード Barcode

// ----------------------------------------
// Barcode
// http://doc.applican.com/Barcode/index.html
// ----------------------------------------
var Barcode = function(config, queue) {
	this.config = config;
	this.barcodeSuccess = null;
	this.barcodeError = null;
	this.barcodeOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	////////
	//バーコード読み取り
	this.captureBarcode = function(barcodeSuccess, barcodeError, barcodeOptions){
		if(this.isExecute){
			barcodeError();
			return;
		}
		this.isExecute = true;
		
		this.barcodeSuccess = barcodeSuccess;
		this.barcodeError = barcodeError;
		this.barcodeOptions = barcodeOptions;

		if(this.config.debug){
			var me = this;
			var data = 'http://www.google.co.jp/';
			if (typeof(applican_debug_settings) != 'undefined'){
				if (typeof(applican_debug_settings.barcode) != 'undefined'){
					if (typeof(applican_debug_settings.barcode.data) != 'undefined') data=applican_debug_settings.barcode.data;
				}
			}
			setTimeout(
					function(){ me._captureBarcodeSuccess(1, data); },
				100);
		}else{
			var scheme = 'applican-api://barcode/captureBarcode/'+encodeURIComponent(JSON.stringify(barcodeOptions));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._captureBarcodeSuccess = function(codeType, codeData){
		var code = {codeType:codeType, codeData:codeData};
		this.isExecute = false;
		this.barcodeSuccess(code);
	};
	//失敗
	this._captureBarcodeError = function(){
		this.isExecute = false;
		this.barcodeError();
	};
};




/////////////////////////
//コンパス Compass
// ----------------------------------------
// Compass
// http://doc.applican.com/Compass/index.html
// ----------------------------------------
var Compass = function(config, queue) {
	this.config = config;
	this.compassSuccess = null;
	this.compassError = null;
	this.compassOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	////////
	//現在向いている向きを取得
	this.getCurrentHeading = function(compassSuccess, compassError, compassOptions){
		if(this.isExecute){
			var error = {code:CompassError.COMPASS_BUSY_ERR, message:""};
			compassError(error);
			return;
		}
		this.isExecute = true;
		this.compassSuccess = compassSuccess;
		this.compassError = compassError;
		this.compassOptions = compassOptions;

		if(this.config.debug){
			var me = this;

			var magneticHeading = 45.0;
			var trueHeading = 45.0;
			var headingAccuracy = 0;
			var timestamp = (new Date()).getTime();
			if (typeof(applican_debug_settings) != 'undefined'){
				if (typeof(applican_debug_settings.compass) != 'undefined'){
					if (typeof(applican_debug_settings.compass.magneticHeading) != 'undefined') magneticHeading=applican_debug_settings.compass.magneticHeading;
					if (typeof(applican_debug_settings.compass.trueHeading) != 'undefined') trueHeading=applican_debug_settings.compass.trueHeading;
					if (typeof(applican_debug_settings.compass.headingAccuracy) != 'undefined') headingAccuracy=applican_debug_settings.compass.headingAccuracy;
					if (typeof(applican_debug_settings.compass.timestamp) != 'undefined') timestamp=applican_debug_settings.compass.timestamp;
				}
			}
			
			setTimeout(
					function(){ me._getCurrentHeadingSuccess(magneticHeading, trueHeading, headingAccuracy, timestamp); },
				100);
		}else{
			var scheme = 'applican-api://compass/getCurrentHeading/'+encodeURIComponent(JSON.stringify(compassOptions));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getCurrentHeadingSuccess = function(magneticHeading, trueHeading, headingAccuracy, timestamp){
		var heading = {magneticHeading:magneticHeading, trueHeading:trueHeading, headingAccuracy:headingAccuracy, timestamp:timestamp};
		this.isExecute = false;
		this.compassSuccess(heading);
	};
	//失敗
	this._getCurrentHeadingError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.compassError(error);
	};
	

	////////
	//コンパス方位を一定の時間間隔で取得
	this.watchHeading = function(compassSuccess, compassError, compassOptions){
		if(this.isExecute){
			var error = {code:CompassError.COMPASS_BUSY_ERR, message:""};
			compassError(error);
			return;
		}
		
		this.isExecute = true;
		this.compassSuccess = compassSuccess;
		this.compassError = compassError;
		if(compassOptions.frequency){
			this.compassOptions = compassOptions;
		}else{
			this.compassOptions = {frequency:1000};
		}

		if(this.config.debug){
			var me = this;
			
			this.timer = setInterval(
					function(){ 
						var magneticHeading = 45.0;
						var trueHeading = 45.0;
						var headingAccuracy = 0;
						var timestamp = (new Date()).getTime();
						if (typeof(applican_debug_settings) != 'undefined'){
							if (typeof(applican_debug_settings.compass) != 'undefined'){
								if (typeof(applican_debug_settings.compass.magneticHeading) != 'undefined') magneticHeading=applican_debug_settings.compass.magneticHeading;
								if (typeof(applican_debug_settings.compass.trueHeading) != 'undefined') trueHeading=applican_debug_settings.compass.trueHeading;
								if (typeof(applican_debug_settings.compass.headingAccuracy) != 'undefined') headingAccuracy=applican_debug_settings.compass.headingAccuracy;
								if (typeof(applican_debug_settings.compass.timestamp) != 'undefined') timestamp=applican_debug_settings.compass.timestamp;
							}
						}
					
						me._watchHeadingSuccess(magneticHeading, trueHeading, headingAccuracy, timestamp);
					},
				me.compassOptions.frequency);
		}else{
			var scheme = 'applican-api://compass/watchHeading/'+encodeURIComponent(JSON.stringify(compassOptions));
			this.queue.pf_callApi(scheme);
		}
		
		return this.timer;
	};
	//成功
	this._watchHeadingSuccess = function(magneticHeading, trueHeading, headingAccuracy, timestamp){
		var heading = {magneticHeading:magneticHeading, trueHeading:trueHeading, headingAccuracy:headingAccuracy, timestamp:timestamp};
		this.compassSuccess(heading);
	};
	//失敗
	this._watchHeadingError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.compassError(error);
		
		if(this.config.debug){
			clearInterval(this.timer);
		}
		
	};

	////////
	//コンパスの監視を停止
	this.clearWatch = function(watchID){
		this.isExecute = false;
		if(this.config.debug){
			clearInterval(this.timer);
		}else{
			var scheme = 'applican-api://compass/clearWatch/'+watchID;
			this.queue.pf_callApi(scheme);
		}
	};
};





/////////////////////////
//加速度センサー Accelerometer
// ----------------------------------------
// Accelerometer
// http://doc.applican.com/Accelerometer/index.html
// ----------------------------------------
var Accelerometer = function(config, queue) {
	this.config = config;
	this.accelerometerSuccess = null;
	this.accelerometerError = null;
	this.accelerometerOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	
	////////
	//現在の加速度を取得
	this.getCurrentAcceleration = function(accelerometerSuccess, accelerometerError){
		if(this.isExecute){
			accelerometerError();
			return;
		}
		this.isExecute = true;
		this.accelerometerSuccess = accelerometerSuccess;
		this.accelerometerError = accelerometerError;
		this.accelerometerOptions = null;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._getCurrentAccelerationSuccess(1.0, 2.0, 3.0, (new Date()).getTime()); },
				1000);
		}else{
			var scheme = 'applican-api://accelerometer/getCurrentAcceleration/';
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getCurrentAccelerationSuccess = function(x, y, z, timestamp){
		var acceleration = {x:x, y:y, z:z, timestamp:timestamp};
		this.isExecute = false;
		this.accelerometerSuccess(acceleration);
	};
	//失敗
	this._getCurrentAccelerationError = function(){
		this.isExecute = false;
		this.accelerometerError();
	};
	

	////////
	//加速度を一定の時間間隔で取得
	this.watchAcceleration = function(accelerometerSuccess, accelerometerError, accelerometerOptions){
		if(this.isExecute){
			accelerometerError();
			return;
		}
		this.isExecute = true;
		this.accelerometerSuccess = accelerometerSuccess;
		this.accelerometerError = accelerometerError;
		if(accelerometerOptions.frequency){
			this.accelerometerOptions = accelerometerOptions;
		}else{
			this.accelerometerOptions = {frequency:1000};
		}

		if(this.config.debug){
			var me = this;
			this.timer = setInterval(
					function(){ me._watchAccelerationSuccess(0.1, 0.2, 0.3, (new Date()).getTime()); }, 1000);
		}else{
			var scheme = 'applican-api://accelerometer/watchAcceleration/'+encodeURIComponent(JSON.stringify(accelerometerOptions));
			this.queue.pf_callApi(scheme);
		}
		
		return this.timer;
	};
	//成功
	this._watchAccelerationSuccess = function(x, y, z, timestamp){
		var acceleration = {x:x, y:y, z:z, timestamp:timestamp};
		this.accelerometerSuccess(acceleration);
	};
	//失敗
	this._watchAccelerationError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.accelerometerError(error);

		if(this.config.debug){
			clearInterval(this.timer);
		}
		
	};

	////////
	//加速度の監視を停止
	this.clearWatch = function(watchID){
		this.isExecute = false;
		if(this.config.debug){
			clearInterval(watchID);
		}else{
			var scheme = 'applican-api://accelerometer/clearWatch/'+watchID;
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	
	////////
	//シェイクの監視
	this.shakeSuccess = null;
	this.isWatchExecute = false;
	
	this.watchShake = function(successCallback){
		if(this.isWatchExecute)return;
		this.isWatchExecute = true;
		this.shakeSuccess = successCallback;

		if(this.config.debug){
			successCallback();
		}else{
			var scheme = 'applican-api://accelerometer/watchShake/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._watchShakeCallback = function(){
		this.shakeSuccess();
	};
	
	this.clearWatchShake = function(){
		this.isWatchExecute = false;
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://accelerometer/clearWatchShake/';
			this.queue.pf_callApi(scheme);
		}
	};
};



/////////////////////////
//位置情報 Geolocation
// ----------------------------------------
// Geolocation
// http://doc.applican.com/GEOLocation/index.html
// ----------------------------------------
var Geolocation = function(config, queue) {
	this.config = config;
	this.geolocationSuccess = null;
	this.geolocationError = null;
	this.geolocationOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	////////
	//現在位置を取得
	this.getCurrentPosition = function(geolocationSuccess, geolocationError, geolocationOptions){
		if(this.isExecute){
			var error = {code:PositionError.POSITION_BUSY_ERR, message:'watchPosition is running'};
			geolocationError(error);
			return;
		}
		this.isExecute = true;
		this.geolocationSuccess = geolocationSuccess;
		this.geolocationError = geolocationError;
		this.geolocationOptions = geolocationOptions;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._getCurrentPositionSuccess(135.0, 36.0, 10, 10, 10, 180.0, 5.0, (new Date()).getTime()); },
				1000);
		}else{
			var scheme = 'applican-api://geolocation/getCurrentPosition/'+encodeURIComponent(JSON.stringify(geolocationOptions));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getCurrentPositionSuccess = function(latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp){
		var position = {coords:{latitude:latitude, longitude:longitude, altitude:altitude, accuracy:accuracy, altitudeAccuracy:altitudeAccuracy, heading:heading, speed:speed}, timestamp:timestamp};
		this.isExecute = false;
		this.geolocationSuccess(position);
	};
	//失敗
	this._getCurrentPositionError = function(errorCode, errorMessage){
		var error = {code:errorCode, message:errorMessage};
		this.isExecute = false;
		this.geolocationError(error);
	};
	

	////////
	//現在位置を一定の時間間隔で取得
	this.watchPosition = function(geolocationSuccess, geolocationError, geolocationOptions){
		if(this.isExecute){
			var error = {code:PositionError.POSITION_BUSY_ERR, message:'Geolocation is running'};
			geolocationError(error);
			return;
		}
		
		this.isExecute = true;
		this.geolocationSuccess = geolocationSuccess;
		this.geolocationError = geolocationError;
		this.geolocationOptions = geolocationOptions;
		if(!geolocationOptions.frequency){
			this.geolocationOptions = {frequency:1000};
		}

		if(this.config.debug){
			var me = this;
			this.timer = setInterval(
					function(){ me._watchPositionSuccess(135.0, 36.0, 10, 10, 10, 180.0, 5.0, (new Date()).getTime()); }, 1000);
		}else{
			var scheme = 'applican-api://geolocation/watchPosition/'+encodeURIComponent(JSON.stringify(geolocationOptions));
			this.queue.pf_callApi(scheme);
		}
		
		return this.timer;
	};
	//成功
	this._watchPositionSuccess = function(latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, speed, timestamp){
		var position = {coords:{latitude:latitude, longitude:longitude, altitude:altitude, accuracy:accuracy, altitudeAccuracy:altitudeAccuracy, heading:heading, speed:speed}, timestamp:timestamp};
		this.geolocationSuccess(position);
	};
	//失敗
	this._watchPositionError = function(errorCode, errorMessage){
		var error = {code:errorCode, message:errorMessage};
		this.isExecute = false;
		this.geolocationError(error);
		
		if(this.config.debug){
			clearInterval(this.timer);
		}
	};

	////////
	//現在位置の監視を停止
	this.clearWatch = function(watchID){
		if(this.config.debug){
			clearInterval(watchID);
		}else{
			var scheme = 'applican-api://geolocation/clearWatch/'+watchID;
			this.queue.pf_callApi(scheme);
		}
		this.isExecute = false;
	};
};

	
	
	
	
	
/////////////////////////
//ドコモ基地局を利用した位置情報提供機能
// http://www.nttdocomo.co.jp/service/developer/smart_phone/service_lineup/location/index.html
// ----------------------------------------
// DocomoLocation
// http://doc.applican.com/DocomoLocation/index.html
// ----------------------------------------
var Docomolocation = function(config) {
	this.config = config;
	this.geolocationSuccess = null;
	this.geolocationError = null;
	this.geolocationOptions = null;
	this.isExecute = false;
	this.timer = null;
	
	////////
	//現在位置を取得
	this.getCurrentPosition = function(geolocationSuccess, geolocationError, geolocationOptions){
		if(this.isExecute){
			geolocationError({code:0, message:'BUSY'});
			return;
		}
		this.isExecute = true;
		this.geolocationSuccess = geolocationSuccess;
		this.geolocationError = geolocationError;
		this.geolocationOptions = geolocationOptions;
		if(this.config.debug){
			var me = this;
			setTimeout(function(){
				var adr = '東京都千代田区千代田';
				var address = me._parseAddressString(adr);
				me._getCurrentPositionSuccess({
					coords: {
						latitude  : parseFloat('N036.06500'.replace(/^[A-Z]/, ''), 10),
						longitude : parseFloat('E139.06500'.replace(/^[A-Z]/, ''), 10),
						Lat       : 'N036.06500',
						Lon       : 'E139.06500'
					},
					address: {
						country    : address.country,
						region     : address.region,
						city       : address.city,
						street     : address.street,
						postalCode : '1000001',
						AreaCode   : '00001',
						AreaName   : '千代田区',
						Adr        : adr,
						AdrCode    : '13001001001',
						PostalCode : '1000001'
					},
					timestamp:(new Date()).getTime(),
					code: 2000,
					message: ''
				});
			}, 1000);
		}else{
			this._getCurrentPosition();
		}
	};
	
	this._getCurrentPosition = function() {
		var xhr = new XMLHttpRequest();
		var me = this;
		xhr.onload = function() {
			me._receiveResponse(xhr);
		};
		xhr.open('POST', 'https://api.spmode.ne.jp/nwLocation/GetLocation', true);
		xhr.setRequestHeader('If-Modified-Since', 'Mon, 27 Mar 1972 00:00:00 GMT');
		xhr.setRequestHeader('Content-Type', 'application/xml; charset=UTF-8');
		xhr.send(this._getRequestXml());
		this.timer = window.setTimeout(function() {
			xhr.abort();
			me._getCurrentPositionError({code:0, message:'タイムアウト'});
			return;
		}, 3000);
	};
	this._receiveResponse = function(xhr) {
		if(this.timer) {
			window.clearTimeout(this.timer);
			this.timer = null;
		}
		var err = {
			status: xhr.status,
			statusText: xhr.statusText,
			responseText: xhr.responseText,
			responseXML: xhr.responseXML,
			code: 0,
			message: ''
		};
		if (xhr.status === 200) {
			var code = this._getFirstChildText(xhr.responseXML, 'ResultCode');
			if(!code) {
				err.message = '不正な応答';
				this._getCurrentPositionError(err);
				return;
			}
			var xml = xhr.responseXML;
			var code2 = parseInt(code, 10);
			err.code = code2;
			var message = this._getFirstChildText(xml, 'Message');
			err.message = message;
			if(code2 >= 2000 && code2 < 3000) {
				var lat = this._getFirstChildText(xml, 'Lat');
				var lon = this._getFirstChildText(xml, 'Lon');
				var postal_code = this._getFirstChildText(xml, 'AdrCode');
				var adr = this._getFirstChildText(xml, 'Adr');
				var address = this._parseAddressString(adr);
				this._getCurrentPositionSuccess({
					coords: {
						latitude  : parseFloat(lat.replace(/^[A-Z]/, ''), 10),
						longitude : parseFloat(lon.replace(/^[A-Z]/, ''), 10),
						Lat       : lat,
						Lon       : lon
					},
					address: {
						country    : address.country,
						region     : address.region,
						city       : address.city,
						street     : address.street,
						postalCode : postal_code,
						AreaCode   : this._getFirstChildText(xml, 'AreaCode'),
						AreaName   : this._getFirstChildText(xml, 'AreaName'),
						Adr        : adr,
						AdrCode    : this._getFirstChildText(xml, 'AdrCode'),
						PostalCode : postal_code
					},
					timestamp:this._getFirstChildText(xml, 'Time'),
					code: code2,
					message: message
				});
			} else {
				this._getCurrentPositionError(err);
				return;
			}
		} else {
			err.message = '通信エラー';
			this._getCurrentPositionError(err);
			return;
		}
	};
	this._getFirstChildText = function(xml, tag) {
		try {
			return xml.getElementsByTagName(tag).item(0).textContent;
		} catch(e) {
			return '';
		}
	};
	this._getRequestXml = function() {
		var x = '';
		x += '<?xml version="1.0" encoding="UTF-8"?>';
		x += '<DDF ver="1.0">';
		x += ' <RequestInfo>';
		x += '  <RequestParam>';
		x += '   <APIKey>';
		x += '    <APIKey1_ID>' + this.geolocationOptions.APIKey1 + '</APIKey1_ID >';
		x += '    <APIKey2>' + this.geolocationOptions.APIKey2 + '</APIKey2>';
		x += '   </APIKey>';
		x += '   <OptionProperty>';
		x += '    <AreaCode></AreaCode>';
		x += '    <AreaName></AreaName>';
		x += '    <Adr></Adr>';
		x += '    <AdrCode></AdrCode>';
		x += '    <PostCode></PostCode>';
		x += '   </OptionProperty>';
		x += '  </RequestParam>';
		x += ' </RequestInfo>';
		x += '</DDF>';
		return x;
	};
	this._parseAddressString = function(str) {
		var i;
		var c;
		var len;
		
		// 都道府県の判定
		var m = str.match(/^(東京都|京都府|[^都道府県]+[都道府県])/);
		var region = m[0];
		str = str.replace((new RegExp('^'+region)), '');
		// 市区町村の判定
		var city = '';
		var chars = str.split('');
		if(str.match(/区/)) {
			for( i=0, len=chars.length; i<len; i++ ) {
				c = chars[i];
				city += c;
				if(c === '区') { break; }
			}
		} else if(str.match(/^(市川市|四日市市|八日市市|町田市|十日町市|大町市|原町市|武蔵村山市|東村山市|羽村市|村上市|中村市|大村市|村山市|市来町|東市来町|余市町|種市町|市貝町|上市町|野々市町|市川大門町|市川町|下市町|六日市町|市場町|野市町|大町町|鹿町町|村田町|玉村町|村松町|村岡町|市浦村)/)) {
			city = RegExp.$1;
		} else if(str.match(/[市町村]/)) {
			for( i=0, len=chars.length; i<len; i++ ) {
				c = chars[i];
				city += c;
				if(c.match(/[市町村]/)) { break; }
			}
		}
		str = str.replace((new RegExp('^'+city)), '');
		// 町域名
		var street = str;
		//
		return {
			region: region,
			city: city,
			street: street
		};
	};
	//成功
	this._getCurrentPositionSuccess = function(position){
		this.isExecute = false;
		this.geolocationSuccess(position);
	};
	//失敗
	this._getCurrentPositionError = function(err){
		this.isExecute = false;
		this.geolocationError(err);
	};
};




/////////////////////////
//通信環境 Connection
// ----------------------------------------
// Connection
// http://doc.applican.com/Connection/index.html
// ----------------------------------------
var _Connection = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;

	this.type = "UNKNOWN";
	
	//成功
	this._connectionType = function(type){
		this.type = type;
	};
};


/////////////////////////
//デバイス Device
// ----------------------------------------
// Device
// http://doc.applican.com/Device/index.html
// ----------------------------------------
var _Device = function(config, queue) {
	this.config = config;
	this.deviceSuccess = null;
	this.deviceError = null;
	this.deviceOptions = null;
	this.isExecute = false;
	this.queue = queue;

	
	////////
	//Push通知用のデバイストークンを取得
	this.getPushToken = function(deviceSuccess, deviceError, deviceOptions){
		if(this.isExecute){
			deviceError();
			return;
		}
		this.isExecute = true;
		this.deviceSuccess = deviceSuccess;
		this.deviceError = deviceError;
		this.deviceOptions = deviceOptions;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._getPushTokenSuccess('1234567890'); },
				100);
		}else{
			var scheme = 'applican-api://device/getPushToken/';
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getPushTokenSuccess = function(pushToken){
		var res = {pushToken:pushToken};
		this.isExecute = false;
		this.deviceSuccess(res);
	};
	//失敗
	this._getPushTokenError = function(/*errorCode*/){
		this.isExecute = false;
		this.deviceError();
	};
	
	
	this.light = function(enable){
		var options={};
		options.enable = enable;
		
		if(applican.config.debug){
		}else{
			var scheme = 'applican-api://device/light/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};

	this.getDisplayInfo = function(successCallback, errorCallback){
		if(this.config.debug){
				successCallback({orientation:"PORTRAIT", width:360, height:560});
		}else{
			var scheme = 'applican-api://device/getDisplayInfo/';
			this.queue.pf_callApi(scheme, true, successCallback, errorCallback);
		}
	};
	
	//画面の常時点灯
	this.keepScreenOn = function(enable){
		var options={};
		options.enable = enable;
		
		if(applican.config.debug){
		}else{
			var scheme = 'applican-api://device/keepScreenOn/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};

	// IDFA
	this.getAdvertisingId = function(successCallback, errorCallback) {
		if (this.config.debug) {
			successCallback("00000000-0000-0000-0000-000000000000");
		} else {
			var scheme = 'applican-api://device/getAdvertisingId/';
			this.queue.pf_callApi(scheme, true, successCallback, errorCallback);
		}
	};
};


/////////////////////////
//カメラ
// ----------------------------------------
// Camera
// http://doc.applican.com/Camera/index.html
// ----------------------------------------
var _Camera = function(config, queue) {
	this.config = config;
	this.cameraSuccess = null;
	this.cameraError = null;
	this.cameraOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	this.DestinationType = {
		DATA_URL : 0,           // 画像を Base64 形式で取得
		FILE_URI : 1            // 画像をファイル URI として取得
	};

	this.PictureSourceType = {
		PHOTOLIBRARY : 0,
		CAMERA : 1,
		SAVEDPHOTOALBUM : 2
	};
	this.EncodingType = {
		JPEG : 0,
		PNG : 1
	};
	
	this.MediaType = {
		PICTURE: 0,
		VIDEO: 1,
		ALLMEDIA : 2
	};

	
	////////
	//カメラ撮影
	this.takePicture = function(cameraSuccess, cameraError, cameraOptions){
		if(this.isExecute){
			cameraError();
			return;
		}
		this.isExecute = true;
		
		this.cameraSuccess = cameraSuccess;
		this.cameraError = cameraError;
		this.cameraOptions = cameraOptions;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._takePictureSuccess('debug_result'); },
				100);
		}else{
			var scheme = 'applican-api://camera/takePicture/'+encodeURIComponent(JSON.stringify(cameraOptions));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._takePictureSuccess = function(result){
		var res = {result:result};
		this.isExecute = false;
		this.cameraSuccess(res);
	};
	//失敗
	this._takePictureError = function(){
		this.isExecute = false;
		this.cameraError();
	};
	
	
	////////
	//カメラ撮影(PhoneGap)
	this.getPicture = function(cameraSuccess, cameraError, cameraOptions){
		if(this.isExecute){
			cameraError('BUSY');
			return;
		}
		this.isExecute = true;
		
		this.cameraSuccess = cameraSuccess;
		this.cameraError = cameraError;
		this.cameraOptions = cameraOptions;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._getPictureSuccess('debug_result'); },
				100);
		}else{
			var scheme = 'applican-api://camera/getPicture/'+encodeURIComponent(JSON.stringify(cameraOptions));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getPictureSuccess = function(result){
		//var res = {result:result};
		this.isExecute = false;
		this.cameraSuccess(result);
	};
	//失敗
	this._getPictureError = function(message){
		this.isExecute = false;
		this.cameraError(message);
	};
	
	
	////////
	//画像ファイルをクリーンアップ(PhoneGap)
	this.cleanup = function(cameraSuccess, cameraError){
		if(this.isExecute){
			cameraError('BUSY');
			return;
		}
		this.isExecute = true;
		
		this.cameraSuccess = cameraSuccess;
		this.cameraError = cameraError;

		if(this.config.debug){
			var me = this;
			setTimeout(
					function(){ me._cleanupPictureSuccess(); },
				100);
		}else{
			var scheme = 'applican-api://camera/cleanup/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	//成功
	this._cleanupPictureSuccess = function(){
		this.isExecute = false;
		this.cameraSuccess();
	};
	//失敗
	this._cleanupPictureError = function(message){
		this.isExecute = false;
		this.cameraError(message);
	};
	
	
	////////
	//ライブラリへ保存
	this.saveToPhotoAlbum = function(data, cameraSuccess, cameraError){
		if(this.isExecute){
			cameraError('BUSY');
			return;
		}
		this.isExecute = true;
		
		this.cameraSuccess = cameraSuccess;
		this.cameraError = cameraError;

		if(this.config.debug){
			this.isExecute = false;
			cameraSuccess();
		}else{
			var scheme = 'applican-api://camera/saveToPhotoAlbum/'+encodeURIComponent(data);
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._saveToPhotoAlbumSuccess = function(){
		this.isExecute = false;
		this.cameraSuccess();
	};
	//失敗
	this._saveToPhotoAlbumError = function(message){
		this.isExecute = false;
		this.cameraError(message);
	};
};


/////////////////////////
//デバイス通知機能
// ----------------------------------------
// Notification
// http://doc.applican.com/Notification/index.html
// ----------------------------------------
var _Notification = function(config, queue) {
	this.config = config;
	this.notificationSuccess = null;
	this.notificationError = null;
	this.notificationOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	 
	//alert
	this.alert = function(message, alertCallback, title, buttonName){
		this.notificationSuccess = alertCallback;
		
		if(typeof title === "undefined") title = "Alert";
		if(typeof buttonName === "undefined") buttonName = "OK";

		if(this.config.debug){
			var me = this;
			alert("[title]"+title+"\n"+"[message]"+message+"\n"+"[buttonName]"+buttonName);
			me._alertSuccess();
		}else{
			var opt = {message:message, title:title, buttonName:buttonName};
			var scheme = 'applican-api://notification/alert/'+encodeURIComponent(JSON.stringify(opt));
			this.queue.pf_callApi(scheme);
		}
	};
		
	//成功
	this._alertSuccess = function(){
		this.isExecute = false;
		this.notificationSuccess();
	};
	
	
	//confirm
	this.confirm = function(message, confirmCallback, title, buttonName){
		this.notificationSuccess = confirmCallback;

		if(typeof title === "undefined") title = "Confirm";
		if(typeof buttonName === "undefined") buttonName = "OK,Cancel";

		if(this.config.debug){
			var me = this;
			var res = confirm("[title]"+title+"\n"+"[message]"+message+"\n"+"[buttonName]"+buttonName);
			if(res){
				me._confirmSuccess(1);
			}else{
				me._confirmSuccess(2);
			}
		}else{
			var opt = {message:message, title:title, buttonName:buttonName};
			var scheme = 'applican-api://notification/confirm/'+encodeURIComponent(JSON.stringify(opt));
			this.queue.pf_callApi(scheme);
		}
	};
		
	//成功
	this._confirmSuccess = function(result){
		//var res = {result:result};
		this.isExecute = false;
		this.notificationSuccess(result);
	};
	
	//beep
	this.beep = function(times){
		if(typeof times === "undefined" || !times) times = 1;
		
		if(this.config.debug){
			//alert("Beep times:"+times);
		}else{
			var opt = {times:times};
			var scheme = 'applican-api://notification/beep/'+encodeURIComponent(JSON.stringify(opt));
			this.queue.pf_callApi(scheme);
		}
	};
	
	//vibrate
	this.vibrate = function(milliseconds){
		if(typeof milliseconds === "undefined" || !milliseconds) milliseconds = 1000;
		
		if(this.config.debug){

		}else{
			var opt = {milliseconds:milliseconds};
			var scheme = 'applican-api://notification/vibrate/'+encodeURIComponent(JSON.stringify(opt));
			this.queue.pf_callApi(scheme);
		}
	};
};
	

/////////////////////////
//ローカル通知機能
// ----------------------------------------
// LocalNotification
// http://doc.applican.com/LocalNotification/index.html
// ----------------------------------------
var _LocalNotification = function(config, queue) {
	this.config = config;
	this.localNotificationSuccess = null;
	this.localNotificationError = null;
	this.localNotificationOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	 
	this.schedule = function(localNotificationSuccess, localNotificationError, localNotificationOptions){
		if(this.isExecute){
			localNotificationError({code:LocalNotificationError.NOTIFICATIO_BUSY_ERR});
			return;
		}
		this.isExecute = true;
		
		this.localNotificationSuccess = localNotificationSuccess;
		this.localNotificationError = localNotificationError;
		this.localNotificationOptions = localNotificationOptions;

		if(this.config.debug){
			this._scheduleSuccess();
		}else{
			var scheme = 'applican-api://localNotification/schedule/'+encodeURIComponent(JSON.stringify(localNotificationOptions));
			this.queue.pf_callApi(scheme);
		}
	};

	//成功
	this._scheduleSuccess = function(){
		this.isExecute = false;
		this.localNotificationSuccess();
	};
	//失敗
	this._scheduleError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.localNotificationError(error);
	};

	this.cancel = function(options){
		if(this.config.debug){
			//var me = this;
		}else{
			var scheme = 'applican-api://localNotification/cancel/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};

	this.allCancel = function(){
		if(this.config.debug){
			//var me = this;
		}else{
			var scheme = 'applican-api://localNotification/allCancel/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	this.getBadgeNum = function(localNotificationSuccess){
		this.localNotificationSuccess = localNotificationSuccess;

		if(this.config.debug || this.config.device_os=="ANDROID"){
			this._getBadgeNumSuccess(0);
		}else{
			var scheme = 'applican-api://localNotification/getBadgeNum/';
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._getBadgeNumSuccess = function(result){
		this.localNotificationSuccess(result);
	};


	this.setBadgeNum = function(num){
		var options={};
		options.num = num;
		
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://localNotification/setBadgeNum/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
};

	
	
/////////////////////////
//イベント
var _Event = function(config, queue) {
	this.config = config;
	this.queue = queue;

	this._callback = function(tag){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(tag, false, false);
		document.dispatchEvent(evt);
	};

	this._battery = function(tag, level, isPlugged){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(tag, false, false);
		evt.level = level;
		evt.isPlugged = isPlugged;
		document.dispatchEvent(evt);
	};
	
	this._orientation = function(orientation){
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("orientationchanged", false, false);
		evt.orientation = orientation;
		document.dispatchEvent(evt);
	};
};

/////////////////////////
//連絡先
// ----------------------------------------
// Contacts
// http://doc.applican.com/Contacts/index.html
// ----------------------------------------
var _Contacts = function(config, queue) {
	this.config = config;
	this.contactsSuccess = null;
	this.contactsError = null;
	this.contactsOptions = null;
	this.isExecute = false;
	this.timer = null;
	this.queue = queue;
	
	this.create = function(properties){
		var con  = new Contact();
		if(typeof properties != 'undefined'){
			con._setData(properties);
		}
		return con;
	};

	this.find = function(contactFields, contactSuccess, contactError, options){
		if(this.isExecute){
			contactError({code:ContactError.CONTACT_BUSY});
			return;
		}
		this.isExecute = true;
		
		if(typeof options == 'undefined' || options===null) options={};
		options.fields = contactFields;
		
		this.contactsSuccess = contactSuccess;
		this.contactsError = contactError;
		this.contactsOptions = options;
		
		if(this.config.debug){
			//var me = this;
			var contact = {id:1, displayName:'name1',
				name:{formatted:'formatted', familyName:'familyName', givenName:'givenName',
				middleName:'middleName', honorificPrefix:'honorificPrefix', honorificSuffix:'honorificSuffix'},
				urls:[{type:'home', value:'http://www.google.co.jp', pref:false}]
			};
			var contact2 = {id:2, displayName:'name2',
				name:{formatted:'formatted', familyName:'familyName', givenName:'givenName',
				middleName:'middleName', honorificPrefix:'honorificPrefix', honorificSuffix:'honorificSuffix'},
				urls:[{type:'home', value:'http://www.google.co.jp', pref:false}]
			};
			var contacts = [contact, contact2];
			this.isExecute = false;
			this._findSuccess(contacts);
		}else{
			var scheme = 'applican-api://contacts/find/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._findSuccess = function(contacts){
		var result = [];
		var cnt = contacts.length;
		if(cnt>0){
			for(var i=0; i<cnt; i++){
				var con = new Contact();
				con._setData(contacts[i]);
				result.push(con);
			}
		}
		this.isExecute = false;
		this.contactsSuccess(result);
	};
	this._findError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.contactsError(error);
	};
};


/////////////////////////
//データの簡易保存
// ----------------------------------------
// SimpleStorage
// http://doc.applican.com/SimpleStorage/index.html
// ----------------------------------------
var _simpleStorage = function(config, queue) {
	this.config = config;
	this.queue = queue;
	
	this.get = function(key, successCallback){
		var options={};
		options.key = castToString(key);
		if(this.config.debug){
			successCallback(window.localStorage.getItem(key));
		}else{
			var scheme = 'applican-api://simpleStorage/get/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme, true, successCallback, null);
		}
	};

	this.set = function(key, value, successCallback){
		var options={};
		options.key = castToString(key);
		options.value = castToString(value);

		if(this.config.debug){
			successCallback(window.localStorage.setItem(key, value));
		}else{
			var scheme = 'applican-api://simpleStorage/set/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme, true, successCallback, null);
		}
	};

	this.remove = function(key, successCallback){
		var options={};
		options.key = castToString(key);
		if(this.config.debug){
			successCallback(window.localStorage.removeItem(key));
		}else{
			var scheme = 'applican-api://simpleStorage/remove/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme, true, successCallback, null);
		}
	};

	this.clear = function(successCallback){
		if(this.config.debug){
			successCallback(window.localStorage.clear());
		}else{
			var scheme = 'applican-api://simpleStorage/clear/';
			this.queue.pf_callApi(scheme, true, successCallback, null);
		}
	};
};

/////////////////////////
//Splashscreen
// ----------------------------------------
// SplashScreen
// http://doc.applican.com/SplashScreen/index.html
// ----------------------------------------
var _Splashscreen = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	
	this.stack_bg = null;
	
	this.show = function(portrait, landscape, timeout){
		var options={};
		options.portrait = '';
		options.landscape = '';
		options.timeout = -1;

		if(typeof portrait != 'undefined' && portrait!==null) options.portrait = portrait;
		if(typeof landscape != 'undefined' && landscape!==null) options.landscape = landscape;
		if(typeof timeout != 'undefined' && timeout!==null) options.timeout = timeout;

		if(this.config.debug){
			this.stack_bg = document.bgColor;
			document.bgColor = '#666';
			if(options.timeout>=0){
				setTimeout(function() {
					applican.splashscreen.hide();
				}, options.timeout);
			}
		}else{
			var scheme = 'applican-api://splashscreen/show/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.hide = function(){
		if(this.config.debug){
			document.bgColor = this.stack_bg;
		}else{
			var scheme = 'applican-api://splashscreen/hide/';
			this.queue.pf_callApi(scheme);
		}
	};
};
	
	
	
/////////////////////////
//GoogleAnalytics
// ----------------------------------------
// GoogleAnalytics
// http://doc.applican.com/GoogleAnalytics/index.html
// ----------------------------------------
var _GoogleAnalytics = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;

	
	this.trackView = function(screen){
		var options={};
		options.screen = screen;

		if(this.config.debug){
		}else{
			var scheme = 'applican-api://googleAnalytics/trackView/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.trackEvent = function(category, action, label, value){
		var options={};
		options.category = category;
		options.action = action;
		options.label = label;
		options.value = value;
		
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://googleAnalytics/trackEvent/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
};

	

/////////////////////////
//List
var _List = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.listSuccess = null;
	this.listError = null;

	this.ListType = {
		TITLE : 1,
		SUBTITLE : 2,
		VALUE : 3,
		SUBTITLE_VALUE : 4,
		PICTURE : 5,
		PICTURE_SUBTITLE : 6,
		PICTURE_VALUE : 7,
		PICTURE_SUBTITLE_VALUE : 8
	};
 
	this.show = function(type, title, list_data, successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:ListError.BUSY});
			return;
		}
		
		this.isExecute = true;
		
		this.listSuccess = successCallback;
		this.listError = errorCallback;
		
		if(typeof options == 'undefined' || options===null) options={};
		options.type = type;
		options.title = title;
		options.list_data = list_data;
		if(typeof options.width == 'undefined'){
			options.width = 50;
		}
		if(typeof options.height == 'undefined'){
			options.height = 50;
		}
		
		if(this.config.debug){
			this.isExecute = false;
			successCallback(list_data[0].value);
		}else{
			var scheme = 'applican-api://list/show/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};

	this._showSuccess = function(result){
		this.isExecute = false;
		this.listSuccess(result);
	};

	this._showError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.listError(error);
	};
};


/////////////////////////
//Video
// ----------------------------------------
// Video
// http://doc.applican.com/Video/index.html
// ----------------------------------------
var _Video = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.videoSuccess = null;
	this.videoError = null;
 
	this.play = function(src, successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:VideoError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.videoSuccess = successCallback;
		this.videoError = errorCallback;
		
		if(typeof options == 'undefined' || options===null) options={};
		options.src = src;
		options.clientWidth = document.documentElement.clientWidth;
		options.clientHeight = document.documentElement.clientHeight;
		
		
		//alert(""+options.clientWidth+", "+options.clientHeight);
		
		if(typeof options.width == 'undefined'){
			options.width = options.clientWidth;
		}
		if(typeof options.height == 'undefined'){
			options.height = options.clientHeight;
		}

		if(typeof options.top == 'undefined'){
			if(typeof options.bottom != 'undefined'){
				options.top = options.clientHeight-options.height-options.bottom;
			}else{
				options.top = 0;
			}
		}
		if(typeof options.left == 'undefined'){
			if(typeof options.right != 'undefined'){
				options.left = options.clientWidth-options.width-options.right;
			}else{
				options.left = 0;
			}
		}
		
		if(typeof options.control == 'undefined'){
			options.control = false;
		}
		
		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://video/play/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};

	this._playSuccess = function(){
		this.isExecute = false;
		this.videoSuccess();
	};

	this._playError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.videoError(error);
	};
	
	this.stop = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://video/stop/';
			this.queue.pf_callApi(scheme);
		}
	};
};
	

/////////////////////////
//WiFi
// ----------------------------------------
// WiFi
// http://doc.applican.com/WiFi/index.html
// ----------------------------------------
var _WiFi = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.wifiSuccess = null;
	this.wifiError = null;
 
	this.SecurityType = {
		WPA : "WPA",
		WEP : "WEP",
		NONE : "NONE"
	};
	
	
	this.getStatus = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			successCallback('STATUS');
			this.isExecute = false;
		}else{
			var scheme = 'applican-api://wifi/getStatus/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getStatusSuccess = function(status){
		this.isExecute = false;
		this.wifiSuccess(status);
	};
	this._getStatusError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	this.on = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;

		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			successCallback();
			this.isExecute = false;
		}else{
			var scheme = 'applican-api://wifi/on/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.off = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;

		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://wifi/off/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._wifiSuccess = function(){
		this.isExecute = false;
		this.wifiSuccess();
	};
	
	this._wifiError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	
	this.getSSIDList = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback(['SSID1', 'SSID2', 'SSID3']);
		}else{
			var scheme = 'applican-api://wifi/getSSIDList/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getSSIDListSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._getSSIDListError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	
	this.getCurrentSSID = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback('test_ssid');
		}else{
			var scheme = 'applican-api://wifi/getCurrentSSID/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getCurrentSSIDSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._getCurrentSSIDError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	

	this.connect = function(successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback('xxxx');
		}else{
			var scheme = 'applican-api://wifi/connect/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._connectSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._connectError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	

	this.getCurrentIPv4Address = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback('127.0.0.1');
		}else{
			var scheme = 'applican-api://wifi/getCurrentIPv4Address/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getCurrentIPv4AddressSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._getCurrentIPv4AddressError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};


	this.getAccessPointList = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback([
				{bssid:'0000000000000000', ssid:'SSID1', capabilities:'', level:-60, frequency:2442}
			]);
		}else{
			var scheme = 'applican-api://wifi/getAccessPointList/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getAccessPointListSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._getAccessPointListError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	this.getConfiguredNetworks = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback([
				{ssid:'SSID1', networkId:1, status:'ENABLED'}
			]);
			
			/*
			BSSID 	APのMACアドレス
SSID 	ネットワーク名
hiddenSSID 	ステルスモード
networkId 	ネットワーク番号
preSharedKey 	WPA-PSKの鍵
priority 	複数のAPが使用できるときの優先度
status 	ネットワークの状態
wepKeys 	WEPキー
wepTxKeyIndex 	WEPキーのインデックス
			*/
		}else{
			var scheme = 'applican-api://wifi/getConfiguredNetworks/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getConfiguredNetworksSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._getConfiguredNetworksError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	this.hadConnected = function(ssid, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:WiFiError.BUSY});
			return;
		}
		this.isExecute = true;
		
		var options={};
		options.ssid = ssid;
		
		this.wifiSuccess = successCallback;
		this.wifiError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback(true);
		}else{
			var scheme = 'applican-api://wifi/hadConnected/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._hadConnectedSuccess = function(result){
		this.isExecute = false;
		this.wifiSuccess(result);
	};
	this._hadConnectedError = function(code){
		this.isExecute = false;
		this.wifiError({code:code});
	};
	
	
	
};
	

/////////////////////////
//PopInfo
var _PopInfo = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.popInfoSuccess = null;
	this.popInfoError = null;


	this.init = function(){
		if(this.config.debug){
			//successCallback();
		}else{
			var scheme = 'applican-api://popinfo/init/';
			this.queue.pf_callApi(scheme);
		}
	};

	this.show = function(title, successCallback, errorCallback) {
		if(this.isExecute){
			errorCallback({code:0});
			return;
		}
		this.isExecute = true;

		this.popInfoSuccess = successCallback;
		this.popInfoError = errorCallback;

		var options={};
		options.title = title;

		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://popinfo/show/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};

	this.getId = function(successCallback, errorCallback) {
		if(this.isExecute){
			errorCallback({code:0});
			return;
		}
		this.isExecute = true;

		this.popInfoSuccess = successCallback;
		this.popInfoError = errorCallback;

		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://popinfo/getId/';
			this.queue.pf_callApi(scheme);
		}
	};

	this.showPopinfoSettings = function(){
		if(!this.config.debug){
			var scheme = 'applican-api://popinfo/showPopinfoSettings/';
			this.queue.pf_callApi(scheme);
		}
	};

	this._showSuccess = function(){
		this.isExecute = false;
		this.popInfoSuccess();
	};

	this._showError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.popInfoError(error);
	};
	this._getIdSuccess = function(result){
		this.isExecute = false;
		this.popInfoSuccess(result);
	};

	this._getIdError = function(errorCode){
		var error = {code:errorCode};
		this.isExecute = false;
		this.popInfoError(error);
	};
};


/////////////////////////
//Keyboard
// ----------------------------------------
// Keyboard
// http://doc.applican.com/Keyboard/index.html
// ----------------------------------------
var _Keyboard = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.successDown = null;
	this.successUp = null;
	this.error = null;
 
	this.watchKeyDown = function(successCallback){
		this.successDown = successCallback;

		if(this.config.debug){
		}else{
			var scheme = 'applican-api://keyboard/watchKeyDown/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._watchKeyDownCallback = function(event){
		this.successDown(event);
	};
	
	this.clearWatchKeyDown = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://keyboard/clearWatchKeyDown/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	this.watchKeyUp = function(successCallback){
		this.successUp = successCallback;

		if(this.config.debug){
		}else{
			var scheme = 'applican-api://keyboard/watchKeyUp/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._watchKeyUpCallback = function(event){
		this.successUp(event);
	};
	
	this.clearWatchKeyUp = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://keyboard/clearWatchKeyUp/';
			this.queue.pf_callApi(scheme);
		}
	};
};


/////////////////////////
//Capture
// ----------------------------------------
// Capture
// http://doc.applican.com/Capture/index.html
// ----------------------------------------
var _Capture = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
 

  	this.captureWithOverlay = function (successCallback, errorCallback, options) {
		if (this.isExecute) {
			errorCallback ({code:CaptureError.CAPTURE_BUSY, message:"CAPTURE_BUSY"});
		}

		this.isExecute 	= true;
		this.success 	= successCallback;
		this.error 		= errorCallback;
		this.base64     = false;

		if (typeof options == 'undefined' || options == null) options = {};

		if (options.mode.toLowerCase() === "base64")
		{
			// use it to determine base64 usage
			this.base64 = true;
		}

		if (this.config.debug) {
			var res = [{
				name:"test.jpg",
				fullPath:"/xxx/xxx/test.jpg",
				lastModifiedDate:new Date(),
				size:12345
			}];

			this.isExecute = false;
			successCallback(res);
		} else {
			var scheme = 'applican-api://capture/captureWithOverlay/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	}

	this._captureWithOverlaySuccess = function(result){
		this.isExecute = false;
		if (this.base64 === true)
		{

			this.success(result);
		}
		else
		{
		var len = result.length;
		var JSArrayResult = JSON.parse(result);

		for(var Item in JSArrayResult){
     		if (Item === "fullPath")
     		{
    			var fullPath = JSArrayResult[Item];
    			break;
     		}
		}

		for (var i=0; i<len; i++) {
			var tmpUnix = result[i].lastModifiedDate;
			var date = new Date(tmpUnix*1000);
			result[i].lastModifiedDate = date;
		}

		var JSONResult = JSON.parse(result);
		this.success(JSONResult);
		}
	}

	this._captureWithOverlayError = function(error){
		this.isExecute = false;
		this.error(error);
	}

	this._captureWithOverlayCancelled = function (error) {
		this.isExecute = false;
	}


	this.captureAudio = function(successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:CaptureError.CAPTURE_BUSY, message:"CAPTURE_BUSY"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		if(typeof options == 'undefined' || options===null) options={};
		
		if(this.config.debug){
			var res = [{
				name:"test.m4a",
				fullPath:"/xxx/xxx/test.m4a",
				lastModifiedDate:new Date(),
				size:12345
			}];
			
			this.isExecute = false;
			successCallback(res);
		}else{
			var scheme = 'applican-api://capture/captureAudio/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._captureAudioSuccess = function(result){
		var len = result.length;
		for (var i=0; i<len; i++) {
			var tmpUnix = result[i].lastModifiedDate;
			var date = new Date(tmpUnix*1000);
			result[i].lastModifiedDate = date;
		}
		this.isExecute = false;
		this.success(result);
	};
	this._captureAudioError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.captureVideo = function(successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:CaptureError.CAPTURE_BUSY, message:"CAPTURE_BUSY"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		if(typeof options == 'undefined' || options===null) options={};
		
		if(this.config.debug){
			var res = [{
				name:"test.mp4",
				fullPath:"/xxx/xxx/test.mp4",
				lastModifiedDate:new Date(),
				size:12345
			}];
			
			this.isExecute = false;
			successCallback(res);
		}else{
			var scheme = 'applican-api://capture/captureVideo/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._captureVideoSuccess = function(result){
		var len = result.length;
		for (var i=0; i<len; i++) {
			var tmpUnix = result[i].lastModifiedDate;
			var date = new Date(tmpUnix*1000);
			result[i].lastModifiedDate = date;
		}
		this.isExecute = false;
		this.success(result);
	};
	this._captureVideoError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.captureImage = function(successCallback, errorCallback, options){
		if(this.isExecute){
			errorCallback({code:CaptureError.CAPTURE_BUSY, message:"CAPTURE_BUSY"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		if(typeof options == 'undefined' || options===null) options={};
		
		if(this.config.debug){
			var res = [{
				name:"test.jpg",
				fullPath:"/xxx/xxx/test.jpg",
				lastModifiedDate:new Date(),
				size:12345
			}];
			
			this.isExecute = false;
			successCallback(res);
		}else{
			var scheme = 'applican-api://capture/captureImage/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._captureImageSuccess = function(result){
		var len = result.length;
		for (var i=0; i<len; i++) {
			var tmpUnix = result[i].lastModifiedDate;
			var date = new Date(tmpUnix*1000);
			result[i].lastModifiedDate = date;
		}
		this.isExecute = false;
		this.success(result);
	};
	this._captureImageError = function(error){
		this.isExecute = false;
		this.error(error);
	};
};
	
	

/////////////////////////
//Globalization
// ----------------------------------------
// Globalization
// http://doc.applican.com/Globalization/index.html
// ----------------------------------------
var _Globalization = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
 
	this.getPreferredLanguage = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GlobalizationError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
	
		if(this.config.debug){
			var language = {};
			language.value = "Japanese";
			this.isExecute = false;
			successCallback(language);
		}else{
			var scheme = 'applican-api://globalization/getPreferredLanguage/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getPreferredLanguageSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._getPreferredLanguageError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.getLocaleName = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GlobalizationError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
	
		if(this.config.debug){
			var locale = {};
			locale.value = "ja_JP";
			successCallback(locale);
			this.isExecute = false;
		}else{
			var scheme = 'applican-api://globalization/getLocaleName/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getLocaleNameSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._getLocaleNameError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.getCountry = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GlobalizationError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
	
		if(this.config.debug){
			var country = {};
			country.value = "JP";
			successCallback(country);
			this.isExecute = false;
		}else{
			var scheme = 'applican-api://globalization/getCountry/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getCountrySuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._getCountryError = function(error){
		this.isExecute = false;
		this.error(error);
	};


	this.dateToString = function(srcDate, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GlobalizationError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		var options={};
		options.date = parseInt(srcDate.getTime()/1000);
	
		if(typeof options.formatLength == 'undefined'){
			options.formatLength = 'short';
		}
		if(typeof options.selector == 'undefined'){
			options.selector = 'date and time';
		}
	
		if(this.config.debug){
			var date = {};
			date.value = srcDate.toLocaleString();
			this.isExecute = false;
			successCallback(date);
		}else{
			var scheme = 'applican-api://globalization/dateToString/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._dateToStringSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._dateToStringError = function(error){
		this.isExecute = false;
		this.error(error);
	};
};

	
	

/////////////////////////
//Tab
var _Tab = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
 
	this.setBadge = function(tab, num){
		var options={};
		options.tab = tab;
		options.num = num;
		
		if(this.config.debug){
			
		}else{
			var scheme = 'applican-api://tab/setBadge/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.changeTabImage = function(folder){
		var options={};
		options.folder = folder;
		
		if(this.config.debug){
			
		}else{
			var scheme = 'applican-api://tab/changeTabImage/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
};


/////////////////////////
//GameSound
var _GameSound = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
 
	this.loadBGM = function(list, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GameSoundError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		
		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var options={};
			options.list = list;
			
			var scheme = 'applican-api://gamesound/loadBGM/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._loadBGMSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._loadBGMError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	
	this.playBGM = function(options){
		
		if(this.config.debug){

		}else{
			var scheme = 'applican-api://gamesound/playBGM/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.pauseBGM = function(track){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			
			var scheme = 'applican-api://gamesound/pauseBGM/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.stopBGM = function(track){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			
			var scheme = 'applican-api://gamesound/stopBGM/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.setBGMVolume = function(track, volume){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			options.volume = volume;
			
			var scheme = 'applican-api://gamesound/setBGMVolume/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.stopAllBGM = function(){
		if(this.config.debug){

		}else{
			var scheme = 'applican-api://gamesound/stopAllBGM/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.releaseAllBGM = function(){
		if(this.config.debug){

		}else{
			var scheme = 'applican-api://gamesound/releaseAllBGM/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	this.loadSE = function(list, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:GameSoundError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;
		
		this.success = successCallback;
		this.error = errorCallback;
		
		if(this.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var options={};
			options.list = list;

			var scheme = 'applican-api://gamesound/loadSE/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._loadSESuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._loadSEError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	
	this.playSE = function(track){
		
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			
			var scheme = 'applican-api://gamesound/playSE/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.pauseSE = function(track){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			
			var scheme = 'applican-api://gamesound/pauseSE/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.stopSE = function(track){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			
			var scheme = 'applican-api://gamesound/stopSE/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.setSEVolume = function(track, volume){
		if(this.config.debug){

		}else{
			var options = {};
			options.track = track;
			options.volume = volume;
			
			var scheme = 'applican-api://gamesound/setSEVolume/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	this.stopAllSE = function(){
		if(this.config.debug){

		}else{
			var scheme = 'applican-api://gamesound/stopAllSE/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.releaseAllSE = function(){
		if(this.config.debug){

		}else{
			var scheme = 'applican-api://gamesound/releaseAllSE/';
			this.queue.pf_callApi(scheme);
		}
	};
};
	
	

/////////////////////////
//Http
var _Http = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this.get = function(url, options, successCallback, errorCallback){
		if(options===null) options={};
		options.url = url;

		if(applican.config.debug){
			successCallback('get success.');
		}else{
			var scheme = 'applican-api://http/get/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
		}
	};
	

	this.post = function(url, options, successCallback, errorCallback){
		if(options===null) options={};
		options.url = url;

		if(applican.config.debug){
			successCallback('post success.');
		}else{
			var scheme = 'applican-api://http/post/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
		}
	};
};
	
	

/////////////////////////
//AppC
var _AppC = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this.isShowCutin = function(successCallback, errorCallback){
		if(this.isExecute){
			successCallback(true);
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		if(applican.config.debug){
			this.isExecute = false;
			successCallback(false);
		}else{
			var scheme = 'applican-api://appc/isShowCutin/';
			applican.queue.pf_callApi(scheme);
		}
	};
	this._isShowCutinSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._isShowCutinError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.showCutin = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:AppCError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		if(applican.config.debug){
			this.isExecute = false;
			successCallback(false);
		}else{
			var scheme = 'applican-api://appc/showCutin/';
			applican.queue.pf_callApi(scheme);
		}
	};
	this._showCutinSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._showCutinError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.showWeb = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:AppCError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		if(applican.config.debug){
			this.isExecute = false;
			successCallback(false);
		}else{
			var scheme = 'applican-api://appc/showWeb/';
			applican.queue.pf_callApi(scheme);
		}
	};
	this._showWebSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._showWebError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.showAgreement = function(successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:AppCError.BUSY_ERROR, message:"BUSY_ERROR"});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		if(applican.config.debug){
			this.isExecute = false;
			successCallback(false);
		}else{
			var scheme = 'applican-api://appc/showAgreement/';
			applican.queue.pf_callApi(scheme);
		}
	};
	this._showAgreementSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._showAgreementError = function(error){
		this.isExecute = false;
		this.error(error);
	};
};


/////////////////////////
//Arpl (arara ar appli plus+)
var _Arpl = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this.showAR = function(contents_id, uid, lat, lon, successCallback, errorCallback){
		if(this.isExecute){
			successCallback('');
			return;
		}
		this.isExecute = true;

		var options={};
		options.contents_id = contents_id;
		options.uid = uid;
		options.lat = lat;
		options.lon = lon;
		
		this.success = successCallback;
		this.error = errorCallback;
		
		if(applican.config.debug){
			this.isExecute = false;
			successCallback('');
		}else{
			var scheme = 'applican-api://arpl/showAR/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};
	this._showARSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._showARError = function(error){
		this.isExecute = false;
		this.error(error);
	};
};


	
/////////////////////////
//Purchase アプリ内課金
var _Purchase = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this.getProducts = function(productIds, productType, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:PurchaseError.BUSY, message:'BUSY'});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;

		var options={};
		options.productIds = productIds;
		options.productType = productType;

		if(applican.config.debug){
			var result={};
			result.productId = "productId";
			result.price = "productPrice";
			result.name = "productName";
			result.description = "productDescription";
			this.isExecute = false;
			successCallback(result);
		}else{
			var scheme = 'applican-api://purchase/getProducts/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme, true, successCallback, errorCallback);
		}
	};
	this._getProductsSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._getProductsError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.makePurchase = function(productId, productType, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:PurchaseError.BUSY, message:'BUSY'});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		var options={};
		options.productId = productId;
		options.productType = productType;
	
		if(applican.config.debug){
			var result={};
			result.productId = "productId";
			result.isRestore = "isRestore";
			result.purchaseId = "purchaseId";
			result.receipt = "receipt";
			this.isExecute = false;
			successCallback(result);
		}else{
			var scheme = 'applican-api://purchase/makePurchase/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};
	this._makePurchaseSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._makePurchaseError = function(error){
		this.isExecute = false;
		this.error(error);
	};


	this.finishPurchase = function(purchaseId, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:PurchaseError.BUSY, message:'BUSY'});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		var options={};
		options.purchaseId = purchaseId;
	
		if(applican.config.debug){
			this.isExecute = false;
			successCallback(purchaseId);
		}else{
			var scheme = 'applican-api://purchase/finishPurchase/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};
	this._finishPurchaseSuccess = function(purchaseId){
		this.isExecute = false;
		this.success(purchaseId);
	};
	this._finishPurchaseError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.restorePurchase = function(productType, successCallback, errorCallback){
		if(this.isExecute){
			errorCallback({code:PurchaseError.BUSY, message:'BUSY'});
			return;
		}
		this.isExecute = true;

		this.success = successCallback;
		this.error = errorCallback;
		
		var options={};
		options.productType = productType;
		
		if(applican.config.debug){
			var result={};
			result.id = "productId";
			result.isRestore = "isRestore";
			result.purchaseId = "purchaseId";
			result.receipt = "receipt";
			this.isExecute = false;
			successCallback([result]);
		}else{
			var scheme = 'applican-api://purchase/restorePurchase/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};
	this._restorePurchaseSuccess = function(purchaseId){
		this.isExecute = false;
		this.success(purchaseId);
	};
	this._restorePurchaseError = function(error){
		this.isExecute = false;
		this.error(error);
	};
};




/////////////////////////
//WebSocket
var _WebSocket = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this._onopen = null;
	this._onmessage = null;
	this._onerror = null;
	this._onclose = null;
	
	this._connection = null;

	this.open = function(url, onopen, onmessage, onclose, onerror){
		var options={};
		options.url = url;

		this._onopen = onopen;
		this._onmessage = onmessage;
		this._onerror = onerror;
		this._onclose = onclose;
		
		if(applican.config.debug || this.config.device_os=="IOS"){
			this._connection = new WebSocket(url);
			this._connection.onopen = onopen;
			this._connection.onerror = onerror;
			this._connection.onmessage = onmessage;
			this._connection.onclose = onclose;
		}else{
			var scheme = 'applican-api://webSocket/open/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};

	this._wsOnOpen = function(){
		this._onopen();
	};
	
	this._wsOnMessage = function(event){
		this._onmessage(event);
	};

	this._wsOnError = function(event){
		this._onerror(event);
	};
	
	this._wsOnClose = function(event){
		this._onclose(event);
	};

	this.send = function(data){
		var options={};
		options.data = data;
	
		if(applican.config.debug || this.config.device_os=="IOS"){
			this._connection.send(data);
		}else{
			var scheme = 'applican-api://webSocket/send/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};
	
	this.close = function(){
		if(applican.config.debug || this.config.device_os=="IOS"){
			this._connection.close();
		}else{
			var scheme = 'applican-api://webSocket/close/';
			applican.queue.pf_callApi(scheme);
		}
	};
};
	
	

/////////////////////////
//SlideMenu
var _SlideMenu = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	this.getCurrentMenu = function(successCallback){
		this.success = successCallback;

		if(applican.config.debug){
			successCallback('');
		}else{
			var scheme = 'applican-api://slideMenu/getCurrentMenu/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._getCurrentMenuSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	
	this.setMenu = function(menu){
		var options={};
		options.menu = menu;
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://slideMenu/setMenu/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this.resetMenu = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://slideMenu/resetMenu/';
			this.queue.pf_callApi(scheme);
		}
	};
};


/////////////////////////
//Bluetooth
var _Bluetooth = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.progress = null;

	this.success2 = null;
	this.error2 = null;

	this._onopen = null;
	this._onmessage = null;
	this._onerror = null;
	this._onclose = null;
	
	this.isSupported = function(successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback(true);
		}else{
			var scheme = 'applican-api://bluetooth/isSupported/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._isSupportedSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._isSupportedError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.isEnabled = function(successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback(true);
		}else{
			var scheme = 'applican-api://bluetooth/isEnabled/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._isEnabledSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._isEnabledError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.enable = function(successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://bluetooth/enable/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._enableSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._enableError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.disable = function(successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://bluetooth/disable/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._disableSuccess = function(){
		this.isExecute = false;
		this.success();
	};
	this._disableError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	this.discover = function(discoveredCallback, finishedCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		this.isExecute = true;
		this.progress = discoveredCallback;
		this.success = finishedCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			finishedCallback([{name:"name",address:"00:00:00:00:00"}]);
		}else{
			var scheme = 'applican-api://bluetooth/discover/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._discoverDiscovered = function(result){
		this.progress(result);
	};
	this._discoverFinished = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._discoverError = function(error){
		this.isExecute = false;
		this.error(error);
	};


	this.discoverableOn = function(discoverableDuration, successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}
		
		var options={};
		options.discoverableDuration = discoverableDuration;
		
		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback(true);
		}else{
			var scheme = 'applican-api://bluetooth/discoverableOn/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._discoverableOnSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._discoverableOnError = function(error){
		this.isExecute = false;
		this.error(error);
	};

	this.getBondedDevices = function(successCallback, errorCallback){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			errorCallback(error);
			return;
		}

		this.isExecute = true;
		this.success = successCallback;
		this.error = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback([{name:"name",address:"00:00:00:00:00"}]);
		}else{
			var scheme = 'applican-api://bluetooth/getBondedDevices/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._getBondedDevicesSuccess = function(result){
		this.isExecute = false;
		this.success(result);
	};
	this._getBondedDevicesError = function(error){
		this.isExecute = false;
		this.error(error);
	};
	
	
	this.cancelDiscovery = function(successCallback, errorCallback){
		this.success2 = successCallback;
		this.error2 = errorCallback;

		if(applican.config.debug){
			this.isExecute = false;
			successCallback();
		}else{
			var scheme = 'applican-api://bluetooth/cancelDiscovery/';
			this.queue.pf_callApi(scheme);
		}
	};
	this._cancelDiscoverySuccess = function(){
		this.success2();
	};
	this._cancelDiscoveryError = function(error){
		this.error2(error);
	};

	this.watchConnection = function(onopen, onmessage, onclose, onerror){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			onerror(error);
			return;
		}

		this.isExecute = true;

		this._onopen = onopen;
		this._onmessage = onmessage;
		this._onclose = onclose;
		this._onerror = onerror;
		
		if(applican.config.debug){
			this._onopen();
		}else{
			var scheme = 'applican-api://bluetooth/watchConnection/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._btSvOnOpen = function(){
		this._onopen();
	};
	this._btSvOnMessage = function(message){
		this._onmessage(message);
	};
	this._btSvOnError = function(error){
		this.isExecute = false;
		this._onerror(error);
	};
	this._btSvOnClose = function(){
		this.isExecute = false;
		this._onclose();
	};
	
	this.connect = function(address, onopen, onmessage, onclose, onerror){
		if(this.isExecute){
			var error = {code:BluetoothError.BUSY_ERROR, message:""};
			onerror(error);
			return;
		}

		var options={};
		options.address = address;
		
		this.isExecute = true;
		
		this._onopen = onopen;
		this._onmessage = onmessage;
		this._onclose = onclose;
		this._onerror = onerror;
		
		if(applican.config.debug){
			this._onopen();
		}else{
			var scheme = 'applican-api://bluetooth/connect/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};

	this._btClOnOpen = function(){
		this._onopen();
	};
	this._btClOnMessage = function(message){
		this._onmessage(message);
	};
	this._btClOnError = function(error){
		this.isExecute = false;
		this._onerror(error);
	};
	this._btClOnClose = function(){
		this.isExecute = false;
		this._onclose();
	};


	this.send = function(data){
		var options={};
		options.data = data;

		if(applican.config.debug){
		}else{
			var scheme = 'applican-api://bluetooth/send/'+encodeURIComponent(JSON.stringify(options));
			applican.queue.pf_callApi(scheme);
		}
	};

	this.disconnect = function(){
		if(applican.config.debug ){
			this._onclose();
		}else{
			var scheme = 'applican-api://bluetooth/disconnect/';
			applican.queue.pf_callApi(scheme);
		}
		this.isExecute = false;
	};
};

	



/////////////////////////
//WebView
var _WebView = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.progress = null;

	this.goBack = function(){
		if(applican.config.debug){
			history.back();
		}else{
			var scheme = 'applican-api://webView/goBack/';
			this.queue.pf_callApi(scheme);
		}
	};

	this.goForward = function(){
		if(applican.config.debug){
			history.forward();
		}else{
			var scheme = 'applican-api://webView/goForward/';
			this.queue.pf_callApi(scheme);
		}
	};

	this.reload = function(){
		if(applican.config.debug){
			location.reload();
		}else{
			var scheme = 'applican-api://webView/reload/';
			this.queue.pf_callApi(scheme);
		}
	};
};


/////////////////////////
//Launcher
var _Launcher = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.progress = null;

	this.urlScheme = function(url, errorCallback){
		this.error = errorCallback;

		var options={};
		options.url = url;

		if(applican.config.debug){
			errorCallback({code:LauncherError.NOT_FOUND, message:''});
		}else{
			var scheme = 'applican-api://launcher/urlScheme/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	this._urlSchemeError = function(error){
		this.error(error);
	};

	this.webview = function(url, options){
		if(typeof options == 'undefined' || options===null) options={};
		options.url = url;

		if(applican.config.debug){
			window.open(url);
		}else{
			var scheme = 'applican-api://launcher/webview/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
};


/////////////////////////
// Beacon: iBeacon API
//
var _Beacon = function (config, queue) {
	var thiz = this;
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.currentWatchId = -1;

	// callbacks
	this.watchBeaconWatchCallbacks = {}; // watchId がキー

	// methods
	this.init = function (successCallback, errorCallback) {
		var scheme = 'applican-api://beacon/init/';
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	};

	this.startMonitoring = function (successCallback, errorCallback) {
		var scheme = 'applican-api://beacon/startMonitoring/';
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	};

	this.stopMonitoring = function (successCallback, errorCallback) {
		var scheme = 'applican-api://beacon/stopMonitoring/';
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	};

	this.isMonitoring = function (successCallback, errorCallback) {
		var scheme = 'applican-api://beacon/isMonitoring/';
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	};

	this.watchBeacon = function (beaconInfo, watchCallback, successCallback, errorCallback) {
		// TODO: validation

		thiz.currentWatchId = thiz.currentWatchId + 1;
		beaconInfo.watchId = thiz.currentWatchId;

		thiz.watchBeaconWatchCallbacks[thiz.currentWatchId] = watchCallback;

		var scheme = 'applican-api://beacon/watchBeacon/' + encodeURIComponent(JSON.stringify(beaconInfo));
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);

		return thiz.currentWatchId;
	};

	this.clearBeacon = function (watchId) {
		if (thiz.watchBeaconWatchCallbacks[watchId])
			delete thiz.watchBeaconWatchCallbacks[watchId];

		var scheme = 'applican-api://beacon/clearBeacon/' + watchId;
		thiz.queue.pf_callApi(scheme);
	};

	this.getBeaconHistory = function (beaconInfo, successCallback, errorCallback) {
		var scheme = 'applican-api://beacon/getBeaconHistory/' + encodeURIComponent(JSON.stringify(beaconInfo));;
		thiz.queue.pf_callApi(scheme, true, successCallback, errorCallback);
	};

	// internal

	// ネイティブ層から呼び出される
	this._watchBeaconWatchCallback = function (watchId, beacon, error)
	{
		if (thiz.watchBeaconWatchCallbacks[watchId])
		{
			thiz.watchBeaconWatchCallbacks[watchId](beacon, error);
		}
	};
};



/////////////////////////
//Platform : バージョン情報等
var _Platform = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.progress = null;

	this.getLibraryVersion = function(){
		return applican.config.version;
	};
	this.getBaseVersion = function(){
		return applican.device.applican;
	};

};

/////////////////////////
// infosound
// ----------------------------------------
// Infosound
// http://doc.applican.com/Infosound/index.html
// ----------------------------------------
var _infosound = function(config, queue) {
	this.config = config;
	this.listeningInProgress = false;
	this.queue = queue;
	this.success = null;
	this.error = null;

	/*
		+++ startListening
	*/

	/*
		available modes:

    	TAG_ALL
    	TAG_NEW
    */
	this.startListening = function(mode, successCallback, errorCallback, tagCallback){

		if(this.listeningInProgress){
			errorCallback({code:InfosoundError.ErrorCodeRecordingInProgress});
			return;
		}

		options = {};
		options.mode = mode;

		this.success = successCallback;
		this.error 	 = errorCallback;
		this.tag_callback = tagCallback;

		this.listeningInProgress = true;
	
		if(this.config.debug){
			successCallback();
			this.listeningInProgress = false;
		}else{
			this.queue.pf_callApi('applican-api://infosound/startListening/'+encodeURIComponent(JSON.stringify(options)));
		}
	};

	this._startListeningSuccess = function(result){
		this.listeningInProgress = false;
		this.success();
	};

	this._startListeningError = function(error){
		this.listeningInProgress = false;
		this.error(error);
	};

	this._tagCallback = function(tag) {
		this.tag_callback(tag);
	};

	/* 
		+++ stopListening
	*/
	this.stopListening = function(successCallback, errorCallback) {
		this.success = successCallback;
		this.error = errorCallback;
		this.listeningInProgress = false;

		if(this.config.debug){
			successCallback();
		}else{
			this.queue.pf_callApi('applican-api://infosound/stopListening/');
		}
	};

	this._stopListeningSuccess = function(result){
		this.success();
	};

	this._stopListeningError = function(result){
		this.error(result);
	};
};

/////////////////////////
// Utilities
var _Utilities = function(config, queue) {
	this.config = config;
	this.isExecute = false;
	this.queue = queue;
	this.success = null;
	this.error = null;
	this.progress = null;

	this.download = function(options, progressCallback, successCallback, errorCallback) {
		this.error = errorCallback;
		this.success = successCallback;
		this.progress = progressCallback;

		if(applican.config.debug){
			errorCallback({code:UtilitiesError.NOT_FOUND, message:''});
		}else{
			var scheme = 'applican-api://utilities/download/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}

		this._downloadProgress = function(progress) {
			this.progress(progress);
		}

		this._downloadSuccess = function(path) {
			this.success(path);
		}

		this._downloadError = function(event) {
			this.error(event);
		}
	};

	this.unzip = function(options, successCallback, errorCallback)
	{
		this.error = errorCallback;
		this.success = successCallback;

		if(applican.config.debug){
			errorCallback({code:UtilitiesError.NOT_FOUND, message:''});
		}else{
			var scheme = 'applican-api://utilities/unzip/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}

		this._unzipSuccess = function(path) {
			this.success(path);
		}

		this._unzipError = function(description) {
			this.error(description);
		}
	};

};

/////////////////////////
//親クラス
var applicanRoot = function() {
	this.callbackId = 0;
	this.callbacks = {};
	this.idCounter = 0;
	this.mediaCounter = 0;

	this.config = {
		version:'1.12.0',
		version_num:1.012000,
		debug:true,
		device_os:'UNKNOWN'
	};
	
	//OS判定
	if(navigator.userAgent.indexOf('iPhone')>0 || navigator.userAgent.indexOf('iPad')>0 || navigator.userAgent.indexOf('iPod')>0){
		this.config.device_os = "IOS";
	}else if(navigator.userAgent.indexOf('Android')>0){
		this.config.device_os = "ANDROID";
	}
	
	//スマホアプリかどうか
	if(navigator.userAgent.indexOf('APP_CLINET/WEBVIEW')>0){
		this.config.debug = false;
	}
	
	//各クラスのインスタンスを生成
	this.queue = new Queue();
	this.accelerometer = new Accelerometer(this.config, this.queue);
	this.compass = new Compass(this.config, this.queue);
	this.geolocation = new Geolocation(this.config, this.queue);
	this.barcode = new Barcode(this.config, this.queue);
	this.docomolocation = new Docomolocation(this.config);
	this.connection = new _Connection(this.config, this.queue);
	this.camera = new _Camera(this.config, this.queue);
	this.notification = new _Notification(this.config, this.queue);
	this.localNotification = new _LocalNotification(this.config, this.queue);
	this.contacts = new _Contacts(this.config, this.queue);
	this.simpleStorage = new _simpleStorage(this.config, this.queue);
	this.splashscreen = new _Splashscreen(this.config, this.queue);
	this.googleAnalytics = new _GoogleAnalytics(this.config, this.queue);
	this.list = new _List(this.config, this.queue);
	this.video = new _Video(this.config, this.queue);
	this.wifi = new _WiFi(this.config, this.queue);
	this.popinfo = new _PopInfo(this.config, this.queue);
	this.keyboard = new _Keyboard(this.config, this.queue);
	this.capture = new _Capture(this.config, this.queue);
	this.globalization = new _Globalization(this.config, this.queue);
	this.tab = new _Tab(this.config, this.queue);
	this.gamesound = new _GameSound(this.config, this.queue);
	this.http = new _Http(this.config, this.queue);
	this.appc = new _AppC(this.config, this.queue);
	this.arpl = new _Arpl(this.config, this.queue);
	this.purchase = new _Purchase(this.config, this.queue);
	this.webSocket = new _WebSocket(this.config, this.queue);
	this.slideMenu = new _SlideMenu(this.config, this.queue);
	this.bluetooth = new _Bluetooth(this.config, this.queue);
	this.webView = new _WebView(this.config, this.queue);
	this.launcher = new _Launcher(this.config, this.queue);
	this.platform = new _Platform(this.config, this.queue);
	this.beacon = new _Beacon(this.config, this.queue);
	this.infosound = new _infosound(this.config, this.queue);
	this.utilities = new _Utilities(this.config, this.queue);

	//デバッグモードの場合、デバッグ用設定値をセットする
	if(this.config.debug){
		if (typeof(applican_debug_settings) != 'undefined'){
			//通信状態
			if (typeof(applican_debug_settings.connection) != 'undefined'){
				
				
				if (typeof(applican_debug_settings.connection.type) != 'undefined') this.connection.type=applican_debug_settings.connection.type;
			}
		}	
	}


	//初期化処理
	//成功
	this._applicanInitSuccess = function(device_info){
		//WebViewの時、コンソールログとエラーを確認できるようにする
		if(!this.config.debug){

			var me = this;
			console.log = function(msg) {
				var options = {message:msg};
				var log = "";
				
				try{
					log = JSON.stringify(options);
				}catch(e){
					try{
						var txt = Object.prototype.toString.apply( msg )+"\n";
						for (var one in msg){
							if (msg.hasOwnProperty(one)) {
								txt += one + "=" + msg[one] + "\n";
							}
						}
						log = JSON.stringify({message:(txt)});
					}catch(ex){
					}
				}
				var scheme = 'applican-api://console/log/'+encodeURIComponent(log);
				me.queue.pf_callApi(scheme);
			};
			
			window.onerror = function(errMsg, url, lineNumber) {
				var options = {message:errMsg, url:url, line:lineNumber};
				var scheme = 'applican-api://console/error/'+encodeURIComponent(JSON.stringify(options));
				me.queue.pf_callApi(scheme);
			};
		}


		this.device = new _Device(this.config, this.queue);
		this.device.name = device_info.name;
		this.device.platform = device_info.platform;
		this.device.uuid = device_info.uuid;
		this.device.uuid_rfc4122 = device_info.uuid_rfc4122;
		this.device.version = device_info.version;
		this.device.applican = device_info.applican;
		this.device.applican_num = device_info.applican_num;
		this.device.applican_type = device_info.applican_type;
		this.device.package_name = device_info.package_name;

		var evt = document.createEvent( "HTMLEvents" ); // カスタムイベントを作成
		evt.initEvent( "deviceready", false, false ); // イベントの詳細を設定
		document.dispatchEvent( evt ); // イベントを強制的に発生させる
		
		this.event = new _Event(this.config, this.queue);
	};

	this._init = function(){
		if(this.config.debug){
			var device_info = {name:"", platform:"", uuid:"", version:"", applican:"", applican_num:0, applican_type:"", package_name:""};

			if (typeof(applican_debug_settings) != 'undefined'){
				if (typeof(applican_debug_settings.device) != 'undefined'){
					if (typeof(applican_debug_settings.device.name) != 'undefined') device_info.name=applican_debug_settings.device.name;
					if (typeof(applican_debug_settings.device.platform) != 'undefined') device_info.platform=applican_debug_settings.device.platform;
					if (typeof(applican_debug_settings.device.uuid) != 'undefined') device_info.uuid=applican_debug_settings.device.uuid;
					if (typeof(applican_debug_settings.device.uuid_rfc4122) != 'undefined') device_info.uuid=applican_debug_settings.device.uuid_rfc4122;
					if (typeof(applican_debug_settings.device.version) != 'undefined') device_info.version=applican_debug_settings.device.version;
					if (typeof(applican_debug_settings.device.applican) != 'undefined') device_info.applican=applican_debug_settings.device.applican;
					if (typeof(applican_debug_settings.device.applican_num) != 'undefined') device_info.applican_num=applican_debug_settings.device.applican_num;
					if (typeof(applican_debug_settings.device.applican_type) != 'undefined') device_info.applican_type=applican_debug_settings.device.applican_type;
					if (typeof(applican_debug_settings.device.package_name) != 'undefined') device_info.package_name=applican_debug_settings.device.package_name;
				}
			}

			this._applicanInitSuccess(device_info);
		}else{
			var scheme = 'applican-api://applican/init/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._successCallback = function(callbackId, result, leaveFlg){
		try{this.callbacks[callbackId].success(result);}catch(e){}
		if(typeof leaveFlg != 'undefined' && leaveFlg){
		}else{
			delete this.callbacks[callbackId];
		}
	};

	this._failCallback = function(callbackId, result, leaveFlg){
		this.callbacks[callbackId].fail(result);
		
		if(typeof leaveFlg != 'undefined' && leaveFlg){
		}else{
			delete this.callbacks[callbackId];
		}
	};
	
	/*
		Fileroot API
	*/
	// returns application external files root
    this.getApplicationExternalFilesRoot = function(successCallback, errorCallback)
    {
        if(typeof options == 'undefined' || options===null) options={};

        this.getApplicationExternalFilesRootSuccess = successCallback;
        this.getApplicationExternalFilesRootError   = errorCallback;

        var scheme = 'applican-api://file/getApplicationExternalFilesRoot/'+encodeURIComponent(JSON.stringify(options));
        this.queue.pf_callApi(scheme);
    };

    this._getApplicationExternalFilesRootSuccess = function(result){
        this.getApplicationExternalFilesRootSuccess(result);
    };

    this._getApplicationExternalFilesRootError = function(result){
        this.getApplicationExternalFilesRootError(result);
    };

    //returns application cache root
    this.getApplicationCacheRoot = function(successCallback, errorCallback)
    {
        if(typeof options == 'undefined' || options===null) options={};

        this.getApplicationCacheRootSuccess = successCallback;
        this.getApplicationCacheRootError 	= errorCallback;

        var scheme = 'applican-api://file/getApplicationCacheRoot/'+encodeURIComponent(JSON.stringify(options));
        this.queue.pf_callApi(scheme);
    };

    this._getApplicationCacheRootSuccess = function(result){
        this.getApplicationCacheRootSuccess(result);
    };

    this._getApplicationCacheRootError = function(result){
        this.getApplicationCacheRootError(result);
    };

    //returns application external cache root
    this.getApplicationExternalCacheRoot = function(successCallback, errorCallback)
    {
        if(typeof options == 'undefined' || options===null) options={};

        this.getApplicationExternalCacheRootSuccess = successCallback;
        this.getApplicationExternalCacheRootError   = errorCallback;

        var scheme = 'applican-api://file/getApplicationExternalCacheRoot/'+encodeURIComponent(JSON.stringify(options));
        this.queue.pf_callApi(scheme);
    };

    this._getApplicationExternalCacheRootSuccess = function(result){
        this.getApplicationExternalCacheRootSuccess(result);
    };

    this._getApplicationExternalCacheRootError = function(result){
        this.getApplicationExternalCacheRootError(result);
    };

	//returns application files root
	this.getApplicationFilesRoot = function(successCallback, errorCallback)
	{
		if(typeof options == 'undefined' || options===null) options={};

		this.getApplicationFilesRootSuccess = successCallback;
		this.getApplicationFilesRootError 	= errorCallback;

		console.log ("Called getApplicationFilesRoot");
		var scheme = 'applican-api://file/getApplicationFilesRoot/'+encodeURIComponent(JSON.stringify(options));
		this.queue.pf_callApi(scheme);
	};

	this._getApplicationFilesRootSuccess = function(result){
		this.getApplicationFilesRootSuccess(result);
	};

	this._getApplicationFilesRootError = function(result){
		this.getApplicationFilesRootError(result);
	};

	this.requestFileSystemSuccess = null;
	this.requestFileSystemError = null;
	this.isFileExecute = false;
	

	this.requestFileSystem = function(type, size, successCallback, opt_errorCallback){
		if(this.isFileExecute)return;
		this.isFileExecute = true;

		this.requestFileSystemSuccess = successCallback;
		this.requestFileSystemError = opt_errorCallback;
		
		var type_str;
		if(type==LocalFileSystem.PERSISTENT){
			type_str = 'persistent';
		}else{
			type_str = 'temporary';
		}
		
		if(this.config.debug){
			if(type==LocalFileSystem.PERSISTENT){
				this._requestFileSystemSuccess('name', 'root_name', 'root_path');
			}else{
				this._requestFileSystemSuccess('name', 'root_name', 'root_path');
			}
		}else{
			var options = {type:type_str, size:size};
			var scheme = 'applican-api://file/requestFileSystem/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	//成功
	this._requestFileSystemSuccess = function(name, root_name, root_path){
		var fileSystem  = new FileSystem(name, new DirectoryEntry(root_name, root_path));
		this.requestFileSystemSuccess(fileSystem);
		this.isFileExecute = false;
	};


	this.openDatabaseSuccess = null;
	this.openDatabaseError = null;
	this.isOpenDatabaseExecute = false;

	this.openDatabase = function(name, successCallback, errorCallback){
		if(this.isOpenDatabaseExecute)return;
		this.isOpenDatabaseExecute = true;
		
		this.openDatabaseSuccess = successCallback;
		this.openDatabaseError = errorCallback;
		
		
		if(this.config.debug){
			this._openDatabaseSuccess(name);
		}else{
			var options = {name:name};
			var scheme = 'applican-api://db/open/'+encodeURIComponent(JSON.stringify(options));
			this.queue.pf_callApi(scheme);
		}
	};
	
	this._openDatabaseSuccess = function(name){
		var db  = new _Database(name);
		this.openDatabaseSuccess(db);
		this.isOpenDatabaseExecute = false;
	};
	this._openDatabaseError = function(error){
		this.openDatabaseError(error);
		this.isOpenDatabaseExecute = false;
	};
	
	this.webViewCloseEventListener = null;
	this.addLaunchWebviewCloseEventListener = function(listener){
		this.webViewCloseEventListener = listener;
	};
	this._webViewClose = function(){
		if(this.webViewCloseEventListener!==null){
			this.webViewCloseEventListener();
		}
	};
	
	
	this.showLogConsole = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://console/show/';
			this.queue.pf_callApi(scheme);
		}
	};
	
	
	//android only
	this.finish = function(){
		if(this.config.debug){
		}else{
			var scheme = 'applican-api://applican/finish/';
			this.queue.pf_callApi(scheme);
		}
	};
};

//インスタンス作成
applican = new applicanRoot();

}());


function applican_init(){
	setTimeout(function(){ applican._init(); }, 50);
}

//document.addEventListener("DOMContentLoaded", applican_init, false);
window.addEventListener("load", applican_init, false);

