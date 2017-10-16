(function (doc) {
    'use strict';
    var Model = (function () {
        function Impl() {
        }
       Impl.prototype.initialize = function () {
       }
       Impl.prototype.requestApi = (function(type,url,data) {
           //console.log('requestApi',data);
          return $
          .ajax({
              type: type, //'GET', POST
              url: url, //
              dataType: 'json',
              data: {
                 request: JSON.stringify(data)
              }
          })
          .then(function (result) {
               console.log(url,result);
               //var obj = JSON.parse(result);
               var obj=result;
               if (!obj || !obj.status=='ok') {
                   console
                       .log("\n\n----------> ERROR in index.js, userService:\nobj || obj.commands || obj.commands.data is NULL or UNDEFINED!\n\n");
                   return null;
               }
               return obj;
           });
       });
       Impl.prototype.login = (function(login,password) {
           //console.log(login,password)
           return this
           .requestApi('POST', '/api/login',{login:login,password: password});
       });
       Impl.prototype.logout= (function() {
           document.cookie = 'api_cookie=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';

       });

       return Impl;

    })();
    var View = (function () {
        var $this;
        function Impl() {
            $this=this;
        }
        Impl.prototype.initialize = function () {
           //var $this = this;
        }
        return Impl;
    })();
    var Controller = (function() {
        var $this;
        function Impl(model,view) {
            $this=this;
            $this.model=model;
            $this.view=view;
        }
        Impl.prototype.initialize = function () {
           $this.view.initialize();
           $this.model.initialize();
        }
        $(doc).ready(function () {
            $('#btnSignIn').click(function(){
                $('#pnlLogin').css('display','block');
                $('#pnlPublic').css('display','none');
                $('#pnlSecure').css('display','none');
                $('#txtPwd').val('');
            });
            $('#btnLogin').click(function(){
               var l=$('#txtLogin').val();
               var p=$('#txtPwd').val();
               $this.model.login(l,p)
                   .then(function(result) {
                       console.log('login result', result,result.status);
                       var status=result.status;
                       if (status==1) {

                           $('#pnlLogin').css('display','none');
                           $('#pnlPublic').css('display','none');
                           $('#pnlSecure').css('display','block');
                       //console.log('login result',result);
                       }
               });
            });
            $('#btnLogOut').click(function(){
                $this.model.logout();
                $('#pnlLogin').css('display','none');
                $('#pnlPublic').css('display','block');
                $('#pnlSecure').css('display','none');
            });

        });
        return Impl;

    })();
   //--------------------------------------------
   //  Initialization
   //--------------------------------------------

   function onInitialized() {
       var result = new $.Deferred();

       $(doc).ready(function () {
           result.resolve();
       });

       return result.promise();
   }

   onInitialized()
       .then(function () {
           var view = new View();
           var model = new Model();

           var controller = new Controller(model, view);

           //controller.initialize();
           //controller.requestData();
           //setInterval(function(){
           //        controller.requestData();
           //},1000*60);
       });



})(document);
