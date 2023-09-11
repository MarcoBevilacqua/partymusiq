import Invitation from "../constants/Invitation";

class InvitationStatus {
  getStatus(status) {
    return Object.values(Invitation.statuses).filter((statusValue) => {
      return statusValue.value === status;
    });
  }

  getStatusLabel(status) {
    return this.getStatus(status)[0].label;
  }

  //utility methods
  isPending(status) {
    return status === Invitation.statuses.PENDING.value;
  }
}

export default InvitationStatus;
