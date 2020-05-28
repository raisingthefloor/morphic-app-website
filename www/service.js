(function(window){
'use strict';

function MorphicService(baseURL){
    if (this === undefined){
        return new MorphicService(baseURL);
    }
    this.baseURL = baseURL;
}

MorphicService.prototype = {

    baseURL: null,

    requestPasswordReset: function(email, completion, target){
        return this._sendRequest("v1/auth/username/password_reset/request", "POST", {email: email}, completion, target);
    },

    resetPassword: function(token, newPassword, completion, target){
        return this._sendRequest("v1/auth/username/password_reset/" + token, "POST", {new_password: newPassword}, completion, target);
    },

    verifyEmail: function(userId, token, completion, target){
        return this._sendRequest("v1/users/" + userId + "/verify_email/" + token, "GET", null, completion, target);
    },

    _sendRequest: function(path, method, payload, completion, target){
        var request = new MorphicRequest(this.baseURL + path, method, payload);
        request.send(completion, target);
        return request;
    }
};

function MorphicRequest(url, method, payload){
    if (this === undefined){
        return new MorphicRequest(url, method, payload);
    }
    this.url = url;
    this.method = method || "GET";
    this.payload = payload || null;
}

MorphicRequest.prototype = {

    url: null,
    method: null,
    payload: null,
    _httpRequest: null,

    send: function(completion, target){
        this._httpRequest = new XMLHttpRequest();
        this._httpRequest.responseType = "json";
        this._httpRequest.addEventListener('loadend', function(e){
            var request = e.currentTarget;
            if (request.status >= 200 && request.status < 300){
                completion.call(target, null, request.response);
            }else{
                completion.call(target, new MorphicError(request.status, request.response), null);
            }
        });
        this._httpRequest.open(this.method, this.url, true);
        var json = null;
        if (this.payload != null){
            json = JSON.stringify(this.payload);
            this._httpRequest.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        }
        this._httpRequest.send(json);
    },

    cancel: function(){
        this._httpRequest.abort();
    }

};

function MorphicError(status, response){
    if (this === undefined){
        return new MorphicError(status, response);
    }
    this.status = status;
    this.response = response || null;
}

window.MorphicService = MorphicService;

// --------------------------------------------------------------------------
// Polyfills

if (!window.URLSearchParams){
    window.URLSearchParams = function(init){
        if (init === window){
            throw new Error("Use the constructor with new");
        }
        var i, l;
        var key, value;
        var pairs = [];
        if (typeof(init) == 'string'){
            if (init[0] == "?"){
                init = init.substr(1);
            }
            var encodedPairs = init.split('&');
            for (i = 0, l = encodedPairs.length; i < l; ++i){
                var encoded = encodedPairs[i];
                var index = encoded.indexOf("=");
                if (index >= 0){
                    key = window.decodeURIComponent(encoded.substr(0, index));
                    value = window.decodeURIComponent(encoded.substr(index + 1));
                }else{
                    key = window.decodeURIComponent(encoded);
                    value = true;
                }
                pairs.push([key, value]);
            }
        }else if (init instanceof Array){
            pairs = init;
        }else{
            for (var k in init){
                pairs.push(k, init[k]);
            }
        }
        this.valuesByKey = {};
        for (i = 0, l = pairs.length; i < l; ++i){
            key = pairs[i][0];
            value = pairs[i][1];
            if (!(key in this.valuesByKey)){
                this.valuesByKey[key] = [];
            }
            this.valuesByKey[key].push(value);
        }
    };

    window.URLSearchParams.prototype = {

        valuesByKey: null,

        get: function(key){
            var values = this.valuesByKey[key];
            if (values && values.length > 0){
                return values[0];
            }
            return null;
        }

    };
}

})(window);