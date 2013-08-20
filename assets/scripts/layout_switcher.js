LayoutSwitcher = {

  IsDisplayed   : false,
  IsClosing     : false,
  ObjectID      : "content-switcher-container",
  ReplaceObject : "",
  SwitcherObject: "",

  Init : function(switch_target) {
    if(typeof switch_target == "object")
      this.ReplaceObject = switch_target;
    else
      this.ReplaceObject = $(switch_target);

    this.ReplaceObject.after(
        '<div style="display:none" class="' + this.ReplaceObject.attr('class') + '" id="' + this.ObjectID + '"></div>'
    );

    this.SwitcherObject = $('#' + this.ObjectID);
  },

  Trigger : function(title, content, operations_html, after_load, operations_position, backLocation) {
    var objectInstance = this, op_html = '';

    operations_position = typeof operations_position == "undefined" ? 2 : operations_position;
    backLocation        = typeof backLocation        == "undefined" ? false : backLocation;

    if(typeof operations_html == "string")
      op_html += '<div class="well space_buttons"><div style="float:right;">' + operations_html + '</div><div style="clear:both;"></div></div>';


    var html =
        '<div class="well">' +
            '<div style="float:left;display:block;">' +
            '<a class="btn btn-info" data-dismiss="switcher" ' + ( backLocation == false ? '' : 'href="' + backLocation + '"')+ '>' +
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

    if(operations_position == 1 || operations_position == 3)
      html += op_html;

    html += '<div class="well">' + content + '</div>';

    if(operations_position == 2 || operations_position == 3)
      html += op_html;

    if(objectInstance.IsDisplayed == true) {
      this.SwitcherObject.fadeOut('slow', function(){
        objectInstance.SwitcherObject.html(html);

        objectInstance.SwitcherObject.find('*[data-dismiss="modal"], *[data-dismiss="switcher"]').bind('click', function(event) {
          event.preventDefault();

          objectInstance.Close();
        });

        objectInstance.SwitcherObject.fadeIn('slow', function(){
          if(typeof after_load !== "undefined" && after_load != false)
            after_load.call({
              'modal'     : objectInstance.GetObject(),
              'switcher'  : objectInstance.GetObject()
            });
        });
      });

      return false;
    }

    this.SwitcherObject.html(html);
    this.SwitcherObject.find('*[data-dismiss="modal"], *[data-dismiss="switcher"]').bind('click', function(event){
      event.preventDefault();

      if($(this).hasAttr('href'))
        window.location = $(this).attr('href');

      objectInstance.Close();
    });

    this.ReplaceObject.effect('drop', {'direction' : 'right'}, function(){
      objectInstance.SwitcherObject.effect('slide', {'direction' : 'left'}, function(){
        objectInstance.IsDisplayed = true;
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

    if(this.IsClosing == true)
      return;

    this.IsClosing = true;

    this.SwitcherObject.effect('drop', {'direction' : 'left'}, function(){
      objectInstance.ReplaceObject.effect('slide', {'direction' : 'right'}, function(){
        objectInstance.IsDisplayed = false;
        objectInstance.IsClosing   = false;
      });
    });
  }

};