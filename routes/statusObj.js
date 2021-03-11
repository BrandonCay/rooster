

 module.exports = function StatusObj(success=true,status=200, msg=""){
    this.success=success;
    this.status=status;
    this.msg=msg;
 };