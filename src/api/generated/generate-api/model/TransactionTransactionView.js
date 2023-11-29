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
import EnrollTransactionView from './EnrollTransactionView';
import StudentTransactionView from './StudentTransactionView';
import TeacherTransactionView from './TeacherTransactionView';
import WalletTransactionView from './WalletTransactionView';
import WithdrawalRequestTransactionView from './WithdrawalRequestTransactionView';

/**
 * The TransactionTransactionView model module.
 * @module model/TransactionTransactionView
 * @version v1
 */
class TransactionTransactionView {
    /**
     * Constructs a new <code>TransactionTransactionView</code>.
     * @alias module:model/TransactionTransactionView
     */
    constructor() { 
        
        TransactionTransactionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>TransactionTransactionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TransactionTransactionView} obj Optional instance to populate.
     * @return {module:model/TransactionTransactionView} The populated <code>TransactionTransactionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TransactionTransactionView();

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
                obj['student'] = StudentTransactionView.constructFromObject(data['student']);
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherTransactionView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('wallet')) {
                obj['wallet'] = WalletTransactionView.constructFromObject(data['wallet']);
            }
            if (data.hasOwnProperty('enroll')) {
                obj['enroll'] = EnrollTransactionView.constructFromObject(data['enroll']);
            }
            if (data.hasOwnProperty('withdrawalRequests')) {
                obj['withdrawalRequests'] = WithdrawalRequestTransactionView.constructFromObject(data['withdrawalRequests']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>TransactionTransactionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>TransactionTransactionView</code>.
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
        // validate the optional field `student`
        if (data['student']) { // data not null
          StudentTransactionView.validateJSON(data['student']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherTransactionView.validateJSON(data['teacher']);
        }
        // validate the optional field `wallet`
        if (data['wallet']) { // data not null
          WalletTransactionView.validateJSON(data['wallet']);
        }
        // validate the optional field `enroll`
        if (data['enroll']) { // data not null
          EnrollTransactionView.validateJSON(data['enroll']);
        }
        // validate the optional field `withdrawalRequests`
        if (data['withdrawalRequests']) { // data not null
          WithdrawalRequestTransactionView.validateJSON(data['withdrawalRequests']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
TransactionTransactionView.prototype['id'] = undefined;

/**
 * @member {String} accountName
 */
TransactionTransactionView.prototype['accountName'] = undefined;

/**
 * @member {Number} amount
 */
TransactionTransactionView.prototype['amount'] = undefined;

/**
 * @member {Date} dateProcess
 */
TransactionTransactionView.prototype['dateProcess'] = undefined;

/**
 * @member {module:model/TransactionTransactionView.TransactionStatusEnum} transactionStatus
 */
TransactionTransactionView.prototype['transactionStatus'] = undefined;

/**
 * @member {String} description
 */
TransactionTransactionView.prototype['description'] = undefined;

/**
 * @member {module:model/TransactionTransactionView.TransactionTypeEnum} transactionType
 */
TransactionTransactionView.prototype['transactionType'] = undefined;

/**
 * @member {Number} parentId
 */
TransactionTransactionView.prototype['parentId'] = undefined;

/**
 * @member {module:model/StudentTransactionView} student
 */
TransactionTransactionView.prototype['student'] = undefined;

/**
 * @member {module:model/TeacherTransactionView} teacher
 */
TransactionTransactionView.prototype['teacher'] = undefined;

/**
 * @member {module:model/WalletTransactionView} wallet
 */
TransactionTransactionView.prototype['wallet'] = undefined;

/**
 * @member {module:model/EnrollTransactionView} enroll
 */
TransactionTransactionView.prototype['enroll'] = undefined;

/**
 * @member {module:model/WithdrawalRequestTransactionView} withdrawalRequests
 */
TransactionTransactionView.prototype['withdrawalRequests'] = undefined;





/**
 * Allowed values for the <code>transactionStatus</code> property.
 * @enum {String}
 * @readonly
 */
TransactionTransactionView['TransactionStatusEnum'] = {

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
TransactionTransactionView['TransactionTypeEnum'] = {

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



export default TransactionTransactionView;

