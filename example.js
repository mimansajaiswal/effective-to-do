$(function() {

  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                 // item is an empty string
  $list = $('ul:first'); 
  $listc = $('ul:eq(1)');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  $newItemButton = $('#newItemButton');          // Cache button to show form

  $('li').hide().each(function(index) {          // Hide list items
    $(this).delay(450 * index).fadeIn(1000);     // Then fade them in
  });

  // ITEM COUNTER
  function updateCount() {                       // Create function to update counter
    var items = $('li[class!=complete]').length; // Number of items in list
    $('#counter:first').text(items);                   // Added into counter circle
  }
  updateCount();                                 // Call the function

  

  // SETUP FORM FOR NEW ITEMS
  
  $newItemForm.show();                         // Show the form
  

  // ADDING A NEW LIST ITEM
  $newItemForm.on('submit', function(e) {       // When a new item is submitted
    e.preventDefault();                         // Prevent form being submitted
    var text = $('input:text').val();           // Get value of text input
    $list.append('<li>' + text + '</li>');      // Add item to end of the list
    $('input:text').val('');                    // Empty the text input
    updateCount();                              // Update the count
  });

  // CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('singleclick', 'li', function() {
    var $this = $(this);               // Cache the element in a jQuery object
                           // Otherwise indicate it is complete
      item = $this.text();             // Get the text from the list item
      $this.remove();                  // Remove the list item
      $listc                            // Add back to end of list as complete
        .append('<li class=\"complete\">' + item + '</li>')
        .hide().fadeIn(300);           // Hide it so it can be faded in
      
      updateCount();                     // Update the counter
                                    // End of else option
  });                                  // End of event handler

  $listc.on('singleclick', 'li', function() {
    var $this = $(this);               // Cache the element in a jQuery object
    var complete = $this.hasClass('complete');  // Is item complete

    if (complete === true) {           // Check if item is complete
      $this.animate({                  // If so, animate opacity + padding
        opacity: 0.0,
        paddingLeft: '+=180'
      }, 500, 'swing', function() {    // Use callback when animation completes
        $this.remove();                // Then completely remove this item
      });
      
    }                            // End of else option
  });                                  // End of event handler


  // DOUBLE CLICK HANDLING - USES DELEGATION ON <ul> ELEMENT
  $list.on('dblclick', 'li', function() {
    var $this = $(this);               // Cache the element in a jQuery object
    var fav = $this.hasClass('favorite');  // Is item complete
    var complete = $this.hasClass('complete');

    

      if (fav === true) {           // Check if item is favorite
        $this.remove();                  // Remove the list item
        item = $this.text(); 
        $list                            // Add back to end of list as complete
          .prepend('<li>' + item + '</li>')
          .hide().fadeIn(300);           // Hide it so it can be faded in
        
      } 

      else {  
      if (complete==false) {                         // Otherwise make it normal
        item = $this.text();             // Get the text from the list item
        $this.remove();                  // Remove the list item
        $list                            // Add back to end of list as normal
          .prepend('<li class=\"favorite\">' + item + '</li>')
          .hide().fadeIn(300);           // Hide it so it can be faded in
                         
      } 
    }                                 // End of else option
  });                                  // End of event handler

});