(function(window, document, undefined) {
  // numeric identifiers for enter, down, and up arrow keys
  var ENTER_KEY_CODE = 13;
  var DOWN_ARROW_KEY_CODE = 40;
  var UP_ARROW_KEY_CODE = 38;

  var $search = $('#search');
  var $suggestions = $('#suggestions');

  var previousTerm = '';

  $search.bind('keyup', function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      return;
    }

    var searchTerm = $search.val().toLowerCase();

    // don't update suggestions if the search term hasn't changed
    if (searchTerm === previousTerm) {
      return;
    }

    // reset suggestions
    $suggestions.html('');

    if (searchTerm !== '') {
      countries.forEach(function(country) {
        // add country to suggestions if it includes the search term
        if (country.toLowerCase().indexOf(searchTerm) !== -1) {
          $('<li></li>').text(country)
            .appendTo($suggestions);
        }
      });
    }

    previousTerm = searchTerm;
  });

  $search.bind('keydown', function(event) {
    if (event.keyCode === DOWN_ARROW_KEY_CODE) {
      // down arrow goes to next suggestion
      event.preventDefault();
      selectNextSuggestion();
    } else if (event.keyCode === UP_ARROW_KEY_CODE) {
      // up arrow goes to previous suggestion
      event.preventDefault();
      selectPreviousSuggestion();
    } else if (event.keyCode === ENTER_KEY_CODE) {
      // enter key uses a suggestion
      useSelectedSuggestion();
    }
  });

  /* Returns the currently selected suggestion in the unordered list or
   * null if no such suggestion exists. */
  function getSelectedSuggestion() {
    return $('#suggestions .selected');
  }

  /* Sets the selected suggestion and deselects the old selected suggestion.
   *
   * Arguments:
   * $suggestion -- the new suggestion to select
   * $oldSuggestion -- the old suggestion to deselect
   */
  function setSelectedSuggestion($suggestion, $oldSuggestion) {
    if ($oldSuggestion) {
      $oldSuggestion.removeClass('selected');
    }

    $suggestion.addClass('selected');
  }

  /* Moves the selected suggestion to the next list element. */
  function selectNextSuggestion() {
    var $selected = getSelectedSuggestion();

    if ($selected.length === 0) {
      // no selected suggestion; select the first one
      setSelectedSuggestion($suggestions.children().eq(0));
    } else if ($selected.next().length > 0) {
      setSelectedSuggestion($selected.next(), $selected);
    }
  }

  /* Moves the selected suggestion to the previous list element. */
  function selectPreviousSuggestion() {
    var $selected = getSelectedSuggestion();

    if ($selected.length !== 0) {
      if ($selected.prev().length > 0) {
        setSelectedSuggestion($selected.prev(), $selected);
      } else {
        // no previous suggestion; deselect all suggestions
        setSelectedSuggestion($(), $selected);
      }
    }
  }

  /* Use the currently selected suggestion, setting the value of the search
   * input to it. */
  function useSelectedSuggestion() {
    var $selected = getSelectedSuggestion();

    if ($selected.length !== 0) {
      $search.val($selected.text());
    }
  }
})(this, this.document);
