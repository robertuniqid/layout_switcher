LayoutSwitcher = {

  IsInit           : false,
  ReplacedObjectId : "to-replace-switcher-container",
  ObjectID         : "content-switcher-container",
  ReplaceObject    : "",
  SwitcherObject   : "",

  Init : function() {
    this.ReplaceObject = $('#' + this.ReplacedObjectId);

    this.ReplaceObject.after(
        '<div style="display:none" class="' + this.ReplaceObject.attr('class') + '" id="' + this.ObjectID + '"></div>'
    );

    this.SwitcherObject = $('#' + this.ObjectID);
  },

  Trigger : function(title, content, after_load) {
    if(this.IsInit == false)
      this.Init();

    var objectInstance = this;


    var html =
        '<div class="well">' +
          '<div style="float:left;display:block;">' +
            '<a class="btn btn-info" data-dismiss="switcher">' +
              '<i class="icon-arrow-left icon-white icon-animated-jumping-left"></i>Back' +
            '</a>' +
          '</div>' +
          '<div style="float:left;display:block;">' +
            '<h2 class="text-info" style="padding: 0;margin: 0 0 0 10px;">' +
              title +
            '</h2>' +
          '</div>' +
          '<div style="clear:both;"></div>' +
        '</div>';

    html += '<div class="well">' + content + '</div>';

    this.SwitcherObject.html(html);
    this.SwitcherObject.find('*[data-dismiss="switcher"]').bind('click', function(event){
      event.preventDefault();
      objectInstance.Close();
    });

    this.ReplaceObject.effect('drop', {'direction' : 'right'}, function(){
      objectInstance.SwitcherObject.effect('slide', {'direction' : 'left'}, function(){
        if(typeof after_load !== "undefined" && after_load != false)
          after_load.call({
            'modal'     : objectInstance.GetObject(),
            'switcher'  : objectInstance.GetObject()
          });
      });
    });
  },

  GetObject : function() {
    return this.SwitcherObject;
  },

  Close : function() {
    var objectInstance = this;

    this.SwitcherObject.effect('drop', {'direction' : 'left'}, function(){
      objectInstance.ReplaceObject.effect('slide', {'direction' : 'right'});
    });
  }

};