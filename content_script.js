console.log('content script !');

const utterance = new SpeechSynthesisUtterance();
utterance.lang = 'en-US';

function onSpeakBtnClick() {
  const wrapper = $(this).parents().filter((i, elm) => $(elm).hasClass('ToggleAnswerFooterWrapper'));
  const answer = $(wrapper[0]).siblings().find('.Answer');
  const $elm = $(answer[0]).find('.u-serif-font-main--regular .ui_qtext_expanded');
  utterance.text = $elm.text();
  speechSynthesis.speak(utterance);
}

setInterval(() => {
  $('.action_bar_inner').each((i, obj) => {
    const $obj = $(obj);
    if ($obj.attr('reg') === undefined) {
      $obj.attr('reg', true);
      const $feedStory = $obj.parents().filter((i, elm) => $(elm).hasClass('FeedStory'));
      const $btn = $(`
        <div class="ActionItemComponent ItemComponent action_item">
          <a class="icon_action_bar-button speak-btn">
            <div class="icon_action_bar-icon icon_action_bar-icon_offset">
              <span class="action_bar-inline_icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <circle fill="#666666" cx="9" cy="9" r="4"/>
                  <path fill="#666666" d="M9 15c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7.76-9.64l-1.68 1.69c.84 1.18.84 2.71 0 3.89l1.68 1.69c2.02-2.02 2.02-5.07 0-7.27zM20.07 2l-1.63 1.63c2.77 3.02 2.77 7.56 0 10.74L20.07 16c3.9-3.89 3.91-9.95 0-14z"/>
                  <path fill="none" d="M0 0h24v24H0z"/>
                </svg>
              </span>
            </div>
            <div class="icon_action_bar-label">
              <span class="u-font-weight--medium u-margin-left--xs">Speak</span>
            </div>
          </a>
        </div>
      `);
      $btn.click(onSpeakBtnClick);
      const $downVote = $feedStory.find('.DownvoteActionItem');
      if (!$downVote.parent().find('.speak-btn').length) {
        $btn.insertAfter($downVote);
      }
    }
  });
}, 500);
