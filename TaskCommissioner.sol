// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

contract TaskCommissioner {
    address owner;
    struct commission {

        //When initially posting a commission, these will be set:
        uint id; //ID for the commission
        address poster; //Address of the user who posted the commission
        string requirements; //Description of the task, to guide user completing task so they know what needs done
        uint commitPrice; //Up front cost for a user to accept the task, may be a fixed percent of payout
        uint payout; //Amount of money a user will gain for completing the task

        //The user completing the commission will update these after paying the commitPrice:
        address assigned; //Address of the user who plans on doing the task

        //Finally, this will be updated, indicating the commission was successful
        bool verified; //Boolean value which determines if the commission was verified
    }

    mapping(uint => uint) public deposit; //maps commission id to the price of commission
    commission[] public ListedCommissions; //List of all non-complete commissions
    commission[] public AllCommissions; //List of all commissions including past commissions, acts as a history of commissions

    constructor(){
        owner = msg.sender;
    }
    function getCurrentCommissions() public view returns (commission[] memory) {
        uint count = 0;
        for (uint i = 0; i < ListedCommissions.length; i++) {
            if (ListedCommissions[i].assigned == msg.sender) {
                count++;
            }
        }
        commission[] memory currentCommissions = new commission[](count);
        uint index = 0;
        for (uint i = 0; i < ListedCommissions.length; i++) {
            if (ListedCommissions[i].assigned == msg.sender) {
                currentCommissions[index] = ListedCommissions[i];
                index++;
            }
        }

        return currentCommissions;
    }

    function postCommission(string memory requirements, uint payout) public payable{
        require(msg.value == payout,"Payment must be made upfront");
        uint256 commitPrice = payout / 10;
        commission memory newCommission = commission(AllCommissions.length + 1, msg.sender, requirements, commitPrice, payout, address(0), false);
        ListedCommissions.push(newCommission);
        AllCommissions.push(newCommission);
        deposit[newCommission.id] = msg.value;
    }
    function acceptCommission(uint id) public payable {
    bool realID = false;
    for(uint i = 0; i < ListedCommissions.length; i++){
        if(ListedCommissions[i].id == id){
            realID = true;
            break;
        }
    }
    require(realID == true, "ID is not valid");
        for (uint i = 0; i < ListedCommissions.length; i++) {
            if (ListedCommissions[i].id == id) {
                require(ListedCommissions[i].assigned != msg.sender);
                require(ListedCommissions[i].assigned == address(0), "Task is already taken.");
                require(msg.value == ListedCommissions[i].commitPrice, "Incorrect commit price");
                deposit[id] += msg.value;
                ListedCommissions[i].assigned = msg.sender;
                AllCommissions[i].assigned = msg.sender;
            }
        }
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;  // This returns the Ether balance of the contract
    }
    function verifyCommission(uint id) public{
        bool realID = false;
        for(uint i = 0; i < ListedCommissions.length; i++){
            if(ListedCommissions[i].id == id){
                realID = true;
                break;
            }
        }
        require(realID == true, "ID is not valid");
        for(uint i = 0; i < ListedCommissions.length; i++) {

            if(ListedCommissions[i].id == id) {
                require(ListedCommissions[i].poster == msg.sender, "Only the poster can verify the commission");
                require(!ListedCommissions[i].verified, "Commission already verified");
                ListedCommissions[i].verified = true;
                uint totalAmount = ListedCommissions[i].payout; //+ deposit[id];
                //return totalAmount;

                require(address(this).balance >= totalAmount, "Insufficient contract balance");

                require(ListedCommissions[i].assigned != address(0), "No user assigned to this commission");
                (bool sent, ) = ListedCommissions[i].assigned.call{value: totalAmount}("");

                //bool sent = payable(ListedCommissions[i].assigned).send(totalAmount);
                require(sent, "Failed to send funds to the assigned user");

                for (uint k = i; k < ListedCommissions.length - 1; k++) {
                    ListedCommissions[k] = ListedCommissions[k + 1];
                }
                ListedCommissions.pop();
            }
        }
    }

}
