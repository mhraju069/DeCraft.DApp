// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";

contract DataNFT is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint256 public tokenId;

    function initialize() public virtual initializer {
        tokenId = 0;
        __ERC721_init("DataNFT", "DNFT");
        __ERC721URIStorage_init();
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function MintNFT(address user, string memory URI) public onlyOwner {
        _safeMint(user, tokenId);
        _setTokenURI(tokenId, URI);
        tokenId++;
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}
}

contract BlockAi is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    DataNFT public dataNFT;
    uint256 public datasetId;

    struct Dataset {
        address payable provider;
        uint256 price;
        string ipfsHash;
        bool isActive;
        uint256 privacyLevel;
    }

    mapping(uint256 => Dataset) public allDatasets;
    mapping(address => uint256) public totalEarning;
    mapping(address => uint256[]) public ownDatasets;
    mapping(address => uint256[]) public accessDatasets;
    mapping(address => mapping(uint256 => bool)) public hasAccess;

    function initialize() public virtual initializer {
        __Ownable_init(msg.sender);
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyOwner {}

    function RegisterDataset(
        string memory _ipfsHash,
        uint256 _price,
        uint256 _privacyLevel,
        string memory nftURI
    ) public virtual {
        allDatasets[datasetId] = Dataset({
            provider: payable(msg.sender),
            price: _price,
            ipfsHash: _ipfsHash,
            isActive: true,
            privacyLevel: _privacyLevel
        });
        ownDatasets[msg.sender].push(datasetId);
        dataNFT.MintNFT(msg.sender, nftURI);
        datasetId++;
    }

    function UpdateDataset(
        uint256 id,
        uint256 newPrice,
        bool active
    ) external virtual {
        require(allDatasets[id].provider == msg.sender, "Not owner");
        Dataset storage ds = allDatasets[id];
        ds.price = newPrice;
        ds.isActive = active;
    }

    function AccessRequest(uint256 id) external payable virtual {
        require(allDatasets[id].price <= msg.value, "Invalid payment ammount");
        require(!hasAccess[msg.sender][id], "Already accessed");
        require(allDatasets[id].provider != msg.sender, "You adready own this");
        require(allDatasets[id].isActive, "Dataset is not active");
        allDatasets[id].provider.transfer(msg.value);
        accessDatasets[msg.sender].push(id);
        hasAccess[msg.sender][id] = true;
    }

    function GetAllDatasets(
        uint start,
        uint end
    ) external view virtual returns (Dataset[] memory) {
        require(start < end && start >= 0, "Invalid range");

        uint256 total = datasetId;

        if (end > total) {
            end = total;
        }

        uint256 size = end - start;
        Dataset[] memory mysets = new Dataset[](size);

        for (uint256 i = start; i < end; i++) {
            mysets[i - start] = allDatasets[i];
        }

        return mysets;
    }

    function GetOwnDatasets(
        uint start,
        uint end
    ) external virtual returns (Dataset[] memory) {
        require(start < end && start >= 0, "Invalid range");

        uint256 total = ownDatasets[msg.sender].length;
        if (end > total) {
            end = total;
        }
        uint256 size = end - start;

        Dataset[] memory mysets = new Dataset[](size);

        for (uint256 i = start; i < end; i++) {
            uint256 id = ownDatasets[msg.sender][i];
            mysets[i - start]  = allDatasets[id];
        }

        return mysets;
    }

    function GetAccessDatasets(
        uint start,
        uint end
    ) external virtual returns (Dataset[] memory) {
        require(start < end && start >= 0, "Invalid range");
        uint256 total = accessDatasets[msg.sender].length;

        if (end > total) {
            end = total;
        }
        uint256 size = end - start;
        Dataset[] memory mysets = new Dataset[](size);

        for (uint256 i = start; i < end; i++) {
            uint256 id = accessDatasets[msg.sender][i];
           mysets[i - start]  = allDatasets[id];
        }

        return mysets;
    }

    function RemoveAccess(uint256 id) external virtual {
        require(hasAccess[msg.sender][id], "You have no access");

        uint256[] storage ds = accessDatasets[msg.sender];
        for (uint256 i = 0; i < ds.length; i++) {
            if (ds[i] == id) {
                ds[i] = ds[ds.length - 1];
                ds.pop();
                break;
            }
        }
        hasAccess[msg.sender][id] = false;
    }

    function RemoveDataset(uint256 id) external virtual {
        require(allDatasets[id].provider == msg.sender, "Not owner");
        uint256[] storage ds = ownDatasets[msg.sender];
        for (uint256 i = 0; i < ds.length; i++) {
            if (ds[i] == id) {
                ds[i] = ds[ds.length - 1];
                ds.pop();
                break;
            }
        }

        delete allDatasets[id];
    }
}
