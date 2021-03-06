function testTemplateNew()
{
  var t = '<span style="${style}">name:${lastname},${firstname}</span>';
  var template = new vs.ui.Template (t);
  
  assertNotNull ('testTemplateNew 1', template);
  assertEquals ('testTemplateNew 2', t, template._str);
  assertEquals ('testTemplateNew 2', t, template.toString ());
}

function testTemplateApply()
{
  var t = '<span style="${style}">name:${lastname},${firstname}</span>';
  var r = "<span style=\"color:blue\">name:Doo,John</span>"
  var template = new vs.ui.Template (t);
  
  var values = {
    lastname : "Doo",
    firstname : "John",
    style : "color:blue"
  };

  assertNotNull ('testTemplateApply 1', template);
  assertEquals ('testTemplateApply 2', r, template.apply (values));
}

function testViewCompile1 ()
{
  var t = '<span style="${style}">name:${lastname},${firstname}</span>';
  var r = "name:Doo,John"
  var s = "color:blue"
  var template = new vs.ui.Template (t);
  var myView = template.compileView ();
  
  myView.lastname = "Doo";
  myView.firstname = "John";
  myView.style = "color:blue";
 
  assertNotNull ('testViewCompile1 1', template);
  assertEquals ('testViewCompile1 2', r, myView.view.innerHTML);
  assertEquals ('testViewCompile1 3', s, myView.view.getAttribute ('style'));
}

function testViewCompile2 ()
{
  var t = '<div><div style="${style}"><div>name:${lastname}</div></div>,<span>${firstname}</span></div>';
  var r1 = "name:Doo"
  var r2 = "John"
  var r3 = "color:blue"
  var template = new vs.ui.Template (t);
  var myView = template.compileView ();
  
  myView.lastname = "Doo";
  myView.firstname = "John";
  myView.style = "color:blue";
 
  assertNotNull ('testViewCompile2 1', template);
  assertEquals ('testViewCompile2 2', r1, myView.view.firstElementChild.firstElementChild.innerHTML);
  assertEquals ('testViewCompile2 3', r2, myView.view.querySelector ('span').innerHTML);
  assertEquals ('testViewCompile2 4', r3, myView.view.firstElementChild.getAttribute ('style'));
 }

function testTemplateClone ()
{
  var t = '<div style="${style}">name:${lastname}<span>,${firstname}</span></div>';
  
  var r1 = "name:Salut1<span>,Gars1</span>"
  var r2 = "name:Salut2<span>,Gars2</span>"
  var r3 = "name:Salut3<span>,Gars2</span>"

  var myTemplate = new vs.ui.Template (t)
  
  var view1 = myTemplate.compileView ();
  view1.lastname = "Salut1"
  view1.firstname = "Gars1";
  view1.style = "display:none";
  
  var view2 = view1.clone ();

  view2.lastname = "Salut2"
  view2.firstname = "Gars2";
  
  var view3 = view2.clone ();

  view3.lastname = "Salut3"
  view3.style = "display:block";
  
  assertNotNull ('testTemplateClone 1', view1);
  assertNotNull ('testTemplateClone 2', view2);
  assertNotNull ('testTemplateClone 3', view3);
  
  assertEquals ('testTemplateClone 4', "Salut1", view1.lastname);
  assertEquals ('testTemplateClone 5', "Gars1", view1.firstname);
  
  assertEquals ('testTemplateClone 6', "Salut2", view2.lastname);
  assertEquals ('testTemplateClone 7', "Gars2", view2.firstname);
  
  assertEquals ('testTemplateClone 8', "Salut3", view3.lastname);
  assertEquals ('testTemplateClone 9', "Gars2", view3.firstname);

  assertEquals ('testTemplateClone 10', r1, view1.view.innerHTML);
  assertEquals ('testTemplateClone 11', r2, view2.view.innerHTML);
  assertEquals ('testTemplateClone 12', r3, view3.view.innerHTML);

  assertEquals ('testTemplateClone 13', "display:none", view1.view.getAttribute ('style'));
  assertEquals ('testTemplateClone 14', "display:none", view2.view.getAttribute ('style'));
  assertEquals ('testTemplateClone 15', "display:block", view3.view.getAttribute ('style'));
}
