pragma solidity 0.4.24;

contract UserID {
    // Read/write candidate

    //Model of UserID
    struct UID_Struct {
      uint driverId;
      string fullName;
      string dob;
      string driverId_endDate;
      uint numOfInfractions;
      string passportId;

    }

    // Array type that stores UID struct type with uint value type as key value(driverId /or id#)
    mapping(uint => UID_Struct) public UID_Map; //solidity generates UID function for us.
    // Constructor

    //Keep track UID's made because you cannot iterate over or count how many elements in a mapping
    uint public UID_Count;

    //function to add candidates
    function addUID (uint id, string _name, string _dob, string _exp_date, uint _infractions, string _passID) private { // _ underscore shows variable is local instead of state
      UID_Count++;
      UID_Map[UID_Count] = UID_Struct(UID_Count, _name, _dob, _exp_date, _infractions, _passID);
    }

    function addUID2 (uint id, string _name, string _dob, string _exp_date, uint _infractions, string _passID) public { // _ underscore shows variable is local instead of state
      UID_Count++;
      UID_Map[UID_Count] = UID_Struct(UID_Count, _name, _dob, _exp_date, _infractions, _passID);
    }

    /* function UserID () public {
      addUID(UID_Count,"Erica Mcbride", "01/02/1993", "20/02/2030", 3, "1278973");
    } */

}
