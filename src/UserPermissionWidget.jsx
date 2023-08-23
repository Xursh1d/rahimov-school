import PropTypes from "prop-types";

function UserPermissionWidget({ hasPermission, children, emptyContent }) {
  return <>{!hasPermission ? children : emptyContent}</>;
}
UserPermissionWidget.propTypes = {
  hasPermission: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  emptyContent: PropTypes.node.isRequired,
};
export default UserPermissionWidget;
