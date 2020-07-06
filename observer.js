const MutnObsvr = {
  init() {
    const targetNode = document.getElementById('ApplicationBody');
    // const targetNode = document.body;

    const config = {attributes: false, childList: true, subtree: true};

    function callback(mutationsList, obsvr) {
      for (let mutation of mutationsList) {
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
