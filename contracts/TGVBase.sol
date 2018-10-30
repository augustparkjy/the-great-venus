pragma solidity ^0.4.24;
import "./SafeMath.sol";

contract TGVBase {

    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath8 for uint8;

    address public owner;
    uint public numUsers;
    uint public maxStatue;
    uint public maxMob;
    uint public maxStage;
    uint public extraCrtPerEquipLevel;
    uint public extraAvdPerEquipLevel;
    uint public levelIncreaseDivFactor;
    uint public equipIncreaseDivFactor;
    uint public equipBigIncreaseDivFactor;
    uint public equipIncreasePowerDivFactor;
    uint public damageMulFactor;
    uint public damageDivFactor;
    uint public damageFlexibler;
    uint public matchableRankGap;

    mapping(address => User) public users;
    mapping(address => mapping(uint => uint)) public defaultStatueLook;
    mapping(address => mapping(uint => EquipInfo)) public statueEquipInfo;
    mapping(uint => Unit) public statueInfoList;
    mapping(uint => Unit) public mobInfoList;
    mapping(uint => uint) public expSpoiledByMob;
    mapping(uint => mapping(uint => uint[])) public stageInfoList;
    mapping(uint => uint) public statueAcquisitionStage;

    constructor() public {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        if (newOwner != address(0)) owner = newOwner;
    }

    modifier onlyValidStatueNo(uint _no) {
        require(_no >= 0 && _no <= maxStatue);
        _;
    }

    modifier onlyValidMobNo(uint _no) {
        require(_no > 0 && _no <= maxMob);
        _;
    }
    
    modifier onlyValidStageNo(uint _no) {
        require(_no > 0 && _no <= maxStage);
        _;
    }

    function createUser(string name, uint[] look) external {
        require(users[msg.sender].level == 0);
        numUsers.add(1);
        users[msg.sender] = User(name, uint32(numUsers), 0, 0, 1, 0, 1, 0);
        for(uint i = 0 ; i < look.length ; i++)
            defaultStatueLook[msg.sender][i] = look[i];
    }

    // returns required exp to reach given level
    function getRequiredExp(uint level) public pure returns(uint) {
        uint sum = 0;
        for(uint i = 1 ; i <= level ; i++)
        {
            sum += (100*i);
        }
        return sum;
    }

    function getStatueRawSpec(uint statueNo, uint level) public view returns (uint, uint, uint, uint, uint) {
        return (
            statueInfoList[statueNo].hp.add((statueInfoList[statueNo].hp/levelIncreaseDivFactor).mul(level.sub(1))),
            statueInfoList[statueNo].atk.add((statueInfoList[statueNo].atk/levelIncreaseDivFactor).mul(level.sub(1))),
            statueInfoList[statueNo].def.add((statueInfoList[statueNo].def/levelIncreaseDivFactor).mul(level.sub(1))),
            statueInfoList[statueNo].crt,
            statueInfoList[statueNo].avd
        );
    }

    function getMobRawSpec(uint mobNo, uint level) public view returns (uint, uint, uint, uint, uint) {
        return (
            mobInfoList[mobNo].hp.add((mobInfoList[mobNo].hp/levelIncreaseDivFactor).mul(level.sub(1))),
            mobInfoList[mobNo].atk.add((mobInfoList[mobNo].hp/levelIncreaseDivFactor).mul(level.sub(1))),
            mobInfoList[mobNo].def.add((mobInfoList[mobNo].hp/levelIncreaseDivFactor).mul(level.sub(1))),
            mobInfoList[mobNo].crt,
            mobInfoList[mobNo].avd
        );
    }

    function getExtraValueByEquip(uint statueNo, uint part, uint equipLevel) public view returns (uint) {
        require(part >= 1 && part <= 5);
        if(equipLevel==0) return 0;
        if(part == 1)
            return (statueInfoList[statueNo].hp/equipIncreaseDivFactor).mul(equipLevel).add((statueInfoList[statueNo].hp/equipBigIncreaseDivFactor).mul(((equipLevel-1)/10)**2)).add(equipLevel**2/equipIncreasePowerDivFactor);
        if(part == 2)
            return (statueInfoList[statueNo].atk/equipIncreaseDivFactor).mul(equipLevel).add((statueInfoList[statueNo].atk/equipBigIncreaseDivFactor).mul(((equipLevel-1)/10)**2)).add(equipLevel**2/equipIncreasePowerDivFactor);
        if(part == 3)
            return (statueInfoList[statueNo].def/equipIncreaseDivFactor).mul(equipLevel).add((statueInfoList[statueNo].def/equipBigIncreaseDivFactor).mul(((equipLevel-1)/10)**2)).add(equipLevel**2/equipIncreasePowerDivFactor);
        if(part == 4)
            return equipLevel * extraCrtPerEquipLevel;
        if(part == 5)
            return equipLevel * extraAvdPerEquipLevel;
    }

    function getStageInfo(uint stageNo) public view returns (uint[], uint[], uint[]) {
        return (stageInfoList[stageNo][1], stageInfoList[stageNo][2], stageInfoList[stageNo][3]);
    }
    
    struct User {
        string name;
        uint32 rank;
        uint32 exp;
        uint32 soul;
        uint32 level;
        uint16 lastStage;
        uint8 numStatues;
        uint8 randNonce;
    }

    struct EquipInfo {
        uint8 hpEquipLook;
        uint8 atkEquipLook;
        uint8 defEquipLook;
        uint8 crtEquipLook;
        uint8 avdEquipLook;
        uint8 hpEquipLevel;
        uint8 atkEquipLevel;
        uint8 defEquipLevel;
        uint8 crtEquipLevel;
        uint8 avdEquipLevel;
    }

    struct Unit {
        uint hp;
        uint atk;
        uint def;
        uint crt;
        uint avd;
        uint skillFactor;
        uint skillChargerSize;
        bool skillMultiTargetable;
    }

}