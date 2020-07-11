// *** july 2020 bid ***
const menuTitleQ = '.MainMenuCurrentItem.MainMenuClose';

// bid ID
const workBidIdQ =
  'WorkBidWorkDetailHeader_Cell_Value Position_OCTANumber_Cell_Value Cell_Value';

// header
const workBidHeaderClx = 'WorkBidWorkDetailHeader_View';
const workBidHeaderCellClxs =
  'WorkBidWorkDetailHeader_Cell Position_PermitsExtraDuty_Cell Field_Cell';
const workBidHeaderLabelClxs =
  'WorkBidWorkDetailHeader_Cell_Label Position_PermitsExtraDuty_Cell_Label Cell_Label';
const workBidHeaderValueClxs =
  'WorkBidWorkDetailHeader_Cell_Value Position_PermitsExtraDuty_Cell_Value Cell_Value';

// field
const workBidFieldParentClxs = 'RosterPositionDetailRosterAssignment';
const workBidFieldDayClxs = 'RosterPositionDetailRosterAssignmentHeaderTitle';
const workBidFieldDetailClxs = 'WorkBidWorkDetailRosterAssignment_View';
const workBidFieldDetailCellClxs =
  'WorkBidWorkDetailRosterAssignment_Cell EndTime_Cell Field_Cell';
const workBidFieldRunIdClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Value Identifier_Cell_Value Cell_Value';
const workBidFieldStartClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Value StartTime_Cell_Value Cell_Value';
const workBidFieldEndClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value';
const workBidFieldWorkTimeClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Value WorkingTime_Cell_Value Cell_Value';
const workBidFieldLabelClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Label StartTime_Cell_Label Cell_Label';
const workBidFieldValueClxs =
  'WorkBidWorkDetailRosterAssignment_Cell_Value EndTime_Cell_Value Cell_Value';

export default {
  menuTitleQ,
  queries: [
    {
      menuTitle: 'Work Bid',
      bidIdClasses: workBidIdQ,
      headerClasses: {
        parent: workBidHeaderClx,
        cell: workBidHeaderCellClxs,
        label: workBidHeaderLabelClxs,
        value: workBidHeaderValueClxs,
      },
      fieldClasses: {
        parent: workBidFieldParentClxs,
        day: workBidFieldDayClxs,
        detail: workBidFieldDetailClxs,
        cell: workBidFieldDetailCellClxs,
        runId: workBidFieldRunIdClxs,
        start: workBidFieldStartClxs,
        end: workBidFieldEndClxs,
        work: workBidFieldWorkTimeClxs,
        label: workBidHeaderLabelClxs,
        value: workBidFieldValueClxs,
      },
    },
    {
      menuTitle: 'Open Assignment Bid',
      bidIdClasses:
        'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value OpenAssignment_OCTANumber_Cell_Value Cell_Value',
      headerClasses: {
        parent: 'OpenAssignmentBidOpenAssignmentDetailHeader_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell OpenAssignment_OCTANumber_Cell Field_Cell',
        label:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Label UnavailableWeeks_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailHeader_Cell_Value UnavailableWeeks_Cell_Value Cell_Value',
      },
      fieldClasses: {
        parent: 'OpenAssignmentDetailWorkday',
        day: 'OpenAssignmentDetailWorkdayHeaderTitle',
        detail: 'OpenAssignmentBidOpenAssignmentDetailWorkday_View',
        cell:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell WorkingTime_Cell Field_Cell',
        runId: 'DisplayIdentifier_Cell_Value',
        start: 'StartTime_Cell_Value',
        end: 'EndTime_Cell_Value',
        work: 'WorkingTime_Cell_Value',
        label:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Label Cell_Label',
        value:
          'OpenAssignmentBidOpenAssignmentDetailWorkday_Cell_Value Cell_Value',
      },
    },
  ],
};
