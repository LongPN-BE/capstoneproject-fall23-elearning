/**
 * FPT SE OnLearn management API
 * FPT OnLearn Management API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import EnrollWithdrawRequestView from './EnrollWithdrawRequestView';
import TeacherWithdrawRequestView from './TeacherWithdrawRequestView';
import WalletWithdrawRequestView from './WalletWithdrawRequestView';
import WithdrawalRequestWithdrawRequestView from './WithdrawalRequestWithdrawRequestView';

/**
 * The TransactionWithdrawRequestView model module.
 * @module model/TransactionWithdrawRequestView
 * @version v1
 */
class TransactionWithdrawRequestView {
    /**
     * Constructs a new <code>TransactionWithdrawRequestView</code>.
     * @alias module:model/TransactionWithdrawRequestView
     */
    constructor() { 
        
        TransactionWithdrawRequestView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TransactionWithdrawRequestView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TransactionWithdrawRequestView} obj Optional instance to populate.
     * @return {module:model/TransactionWithdrawRequestView} The populated <code>TransactionWithdrawRequestView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TransactionWithdrawRequestView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('accountName')) {
                obj['accountName'] = ApiClient.convertToType(data['accountName'], 'String');
            }
            if (data.hasOwnProperty('amount')) {
                obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
            }
            if (data.hasOwnProperty('dateProcess')) {
                obj['dateProcess'] = ApiClient.convertToType(data['dateProcess'], 'Date');
            }
            if (data.hasOwnProperty('transactionStatus')) {
                obj['transactionStatus'] = ApiClient.convertToType(data['transactionStatus'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('transactionType')) {
                obj['transactionType'] = ApiClient.convertToType(data['transactionType'], 'String');
            }
            if (data.hasOwnProperty('parentId')) {
                obj['parentId'] = ApiClient.convertToType(data['parentId'], 'Number');
            }
            if (data.hasOwnProperty('student')) {
                obj['student'] = ApiClient.convertToType(data['student'], Object);
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherWithdrawRequestView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('wallet')) {
                obj['wallet'] = WalletWithdrawRequestView.constructFromObject(data['wallet']);
            }
            if (data.hasOwnProperty('enroll')) {
                obj['enroll'] = EnrollWithdrawRequestView.constructFromObject(data['enroll']);
            }
            if (data.hasOwnProperty('withdrawalRequests')) {
                obj['withdrawalRequests'] = WithdrawalRequestWithdrawRequestView.constructFromObject(data['withdrawalRequests']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TransactionWithdrawRequestView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TransactionWithdrawRequestView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['accountName'] && !(typeof data['accountName'] === 'string' || data['accountName'] instanceof String)) {
            throw new Error("Expected the field `accountName` to be a primitive type in the JSON string but got " + data['accountName']);
        }
        // ensure the json data is a string
        if (data['transactionStatus'] && !(typeof data['transactionStatus'] === 'string' || data['transactionStatus'] instanceof String)) {
            throw new Error("Expected the field `transactionStatus` to be a primitive type in the JSON string but got " + data['transactionStatus']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['transactionType'] && !(typeof data['transactionType'] === 'string' || data['transactionType'] instanceof String)) {
            throw new Error("Expected the field `transactionType` to be a primitive type in the JSON string but got " + data['transactionType']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherWithdrawRequestView.validateJSON(data['teacher']);
        }
        // validate the optional field `wallet`
        if (data['wallet']) { // data not null
          WalletWithdrawRequestView.validateJSON(data['wallet']);
        }
        // validate the optional field `enroll`
        if (data['enroll']) { // data not null
          EnrollWithdrawRequestView.validateJSON(data['enroll']);
        }
        // validate the optional field `withdrawalRequests`
        if (data['withdrawalRequests']) { // data not null
          WithdrawalRequestWithdrawRequestView.validateJSON(data['withdrawalRequests']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
TransactionWithdrawRequestView.prototype['id'] = undefined;

/**
 * @member {String} accountName
 */
TransactionWithdrawRequestView.prototype['accountName'] = undefined;

/**
 * @member {Number} amount
 */
TransactionWithdrawRequestView.prototype['amount'] = undefined;

/**
 * @member {Date} dateProcess
 */
TransactionWithdrawRequestView.prototype['dateProcess'] = undefined;

/**
 * @member {module:model/TransactionWithdrawRequestView.TransactionStatusEnum} transactionStatus
 */
TransactionWithdrawRequestView.prototype['transactionStatus'] = undefined;

/**
 * @member {String} description
 */
TransactionWithdrawRequestView.prototype['description'] = undefined;

/**
 * @member {module:model/TransactionWithdrawRequestView.TransactionTypeEnum} transactionType
 */
TransactionWithdrawRequestView.prototype['transactionType'] = undefined;

/**
 * @member {Number} parentId
 */
TransactionWithdrawRequestView.prototype['parentId'] = undefined;

/**
 * @member {Object} student
 */
TransactionWithdrawRequestView.prototype['student'] = undefined;

/**
 * @member {module:model/TeacherWithdrawRequestView} teacher
 */
TransactionWithdrawRequestView.prototype['teacher'] = undefined;

/**
 * @member {module:model/WalletWithdrawRequestView} wallet
 */
TransactionWithdrawRequestView.prototype['wallet'] = undefined;

/**
 * @member {module:model/EnrollWithdrawRequestView} enroll
 */
TransactionWithdrawRequestView.prototype['enroll'] = undefined;

/**
 * @member {module:model/WithdrawalRequestWithdrawRequestView} withdrawalRequests
 */
TransactionWithdrawRequestView.prototype['withdrawalRequests'] = undefined;





/**
 * Allowed values for the <code>transactionStatus</code> property.
 * @enum {String}
 * @readonly
 */
TransactionWithdrawRequestView['TransactionStatusEnum'] = {

    /**
     * value: "REQUEST"
     * @const
     */
    "REQUEST": "REQUEST",

    /**
     * value: "COMPLETED"
     * @const
     */
    "COMPLETED": "COMPLETED",

    /**
     * value: "DONE"
     * @const
     */
    "DONE": "DONE",

    /**
     * value: "CANCEL"
     * @const
     */
    "CANCEL": "CANCEL"
};


/**
 * Allowed values for the <code>transactionType</code> property.
 * @enum {String}
 * @readonly
 */
TransactionWithdrawRequestView['TransactionTypeEnum'] = {

    /**
     * value: "ENROLLED"
     * @const
     */
    "ENROLLED": "ENROLLED",

    /**
     * value: "SERVICE_CHARGE"
     * @const
     */
    "SERVICE_CHARGE": "SERVICE_CHARGE",

    /**
     * value: "REFUNDED"
     * @const
     */
    "REFUNDED": "REFUNDED"
};



export default TransactionWithdrawRequestView;

