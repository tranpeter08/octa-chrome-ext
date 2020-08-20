import Utils from './utils';

const MutnObsvr = {
  init() {
    const targetNode = document.getElementById('ApplicationBody');
    const config = {attributes: false, childList: true, subtree: true};

    function callback(mutationsList, obsvr) {
      for (let mutation of mutationsList) {
        // console.log(mutation);

        // updated for holiday bid below
        if (
          mutation.target.id === 'HolidayDetail' ||
          mutation.target.className === 'ListBody SortedList FilteredList' ||
          mutation.target.className === 'ListBody SortedList' ||
          mutation.target.className === 'ListBody'
        ) {
          Utils.configureApp();
          break;
        }
        //  ******************************

        if (
          mutation.type !== 'childList' ||
          mutation.target.id !== 'OpenAssignmentBidHome'
        ) {
          break;
        }

        if (!mutation.addedNodes.length) continue;

        let oaDetail;

        for (let {id} of mutation.addedNodes) {
          if (id === 'OpenAssignmentDetail') {
            oaDetail = true;
            break;
          }
        }

        if (oaDetail) {
          Utils.configureApp();
          break;
        }
      }
    }

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  },
};

export default MutnObsvr;
