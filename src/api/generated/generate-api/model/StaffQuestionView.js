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
import AccountQuestionView from './AccountQuestionView';

/**
 * The StaffQuestionView model module.
 * @module model/StaffQuestionView
 * @version v1
 */
class StaffQuestionView {
    /**
     * Constructs a new <code>StaffQuestionView</code>.
     * @alias module:model/StaffQuestionView
     */
    constructor() { 
        
        StaffQuestionView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>StaffQuestionView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StaffQuestionView} obj Optional instance to populate.
     * @return {module:model/StaffQuestionView} The populated <code>StaffQuestionView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StaffQuestionView();

            if (data.hasOwnProperty('staffNumber')) {
                obj['staffNumber'] = ApiClient.convertToType(data['staffNumber'], 'String');
            }
            if (data.hasOwnProperty('account')) {
                obj['account'] = AccountQuestionView.constructFromObject(data['account']);
            }
            if (data.hasOwnProperty('bankName')) {
                obj['bankName'] = ApiClient.convertToType(data['bankName'], 'String');
            }
            if (data.hasOwnProperty('cardNumber')) {
                obj['cardNumber'] = ApiClient.convertToType(data['cardNumber'], 'String');
            }
            if (data.hasOwnProperty('cardHolderName')) {
                obj['cardHolderName'] = ApiClient.convertToType(data['cardHolderName'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>StaffQuestionView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>StaffQuestionView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['staffNumber'] && !(typeof data['staffNumber'] === 'string' || data['staffNumber'] instanceof String)) {
            throw new Error("Expected the field `staffNumber` to be a primitive type in the JSON string but got " + data['staffNumber']);
        }
        // validate the optional field `account`
        if (data['account']) { // data not null
          AccountQuestionView.validateJSON(data['account']);
        }
        // ensure the json data is a string
        if (data['bankName'] && !(typeof data['bankName'] === 'string' || data['bankName'] instanceof String)) {
            throw new Error("Expected the field `bankName` to be a primitive type in the JSON string but got " + data['bankName']);
        }
        // ensure the json data is a string
        if (data['cardNumber'] && !(typeof data['cardNumber'] === 'string' || data['cardNumber'] instanceof String)) {
            throw new Error("Expected the field `cardNumber` to be a primitive type in the JSON string but got " + data['cardNumber']);
        }
        // ensure the json data is a string
        if (data['cardHolderName'] && !(typeof data['cardHolderName'] === 'string' || data['cardHolderName'] instanceof String)) {
            throw new Error("Expected the field `cardHolderName` to be a primitive type in the JSON string but got " + data['cardHolderName']);
        }

        return true;
    }


}



/**
 * @member {String} staffNumber
 */
StaffQuestionView.prototype['staffNumber'] = undefined;

/**
 * @member {module:model/AccountQuestionView} account
 */
StaffQuestionView.prototype['account'] = undefined;

/**
 * @member {String} bankName
 */
StaffQuestionView.prototype['bankName'] = undefined;

/**
 * @member {String} cardNumber
 */
StaffQuestionView.prototype['cardNumber'] = undefined;

/**
 * @member {String} cardHolderName
 */
StaffQuestionView.prototype['cardHolderName'] = undefined;






export default StaffQuestionView;

