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
import SubjectSyllabusView from './SubjectSyllabusView';
import TeacherSyllabusView from './TeacherSyllabusView';

/**
 * The CourseSyllabusView model module.
 * @module model/CourseSyllabusView
 * @version v1
 */
class CourseSyllabusView {
    /**
     * Constructs a new <code>CourseSyllabusView</code>.
     * @alias module:model/CourseSyllabusView
     */
    constructor() { 
        
        CourseSyllabusView.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CourseSyllabusView</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CourseSyllabusView} obj Optional instance to populate.
     * @return {module:model/CourseSyllabusView} The populated <code>CourseSyllabusView</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CourseSyllabusView();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'Number');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('image')) {
                obj['image'] = ApiClient.convertToType(data['image'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('createDate')) {
                obj['createDate'] = ApiClient.convertToType(data['createDate'], 'Date');
            }
            if (data.hasOwnProperty('price')) {
                obj['price'] = ApiClient.convertToType(data['price'], 'Number');
            }
            if (data.hasOwnProperty('limitTime')) {
                obj['limitTime'] = ApiClient.convertToType(data['limitTime'], 'Number');
            }
            if (data.hasOwnProperty('averagePoint')) {
                obj['averagePoint'] = ApiClient.convertToType(data['averagePoint'], 'Number');
            }
            if (data.hasOwnProperty('teacher')) {
                obj['teacher'] = TeacherSyllabusView.constructFromObject(data['teacher']);
            }
            if (data.hasOwnProperty('subject')) {
                obj['subject'] = SubjectSyllabusView.constructFromObject(data['subject']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>CourseSyllabusView</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>CourseSyllabusView</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['status'] && !(typeof data['status'] === 'string' || data['status'] instanceof String)) {
            throw new Error("Expected the field `status` to be a primitive type in the JSON string but got " + data['status']);
        }
        // ensure the json data is a string
        if (data['image'] && !(typeof data['image'] === 'string' || data['image'] instanceof String)) {
            throw new Error("Expected the field `image` to be a primitive type in the JSON string but got " + data['image']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // validate the optional field `teacher`
        if (data['teacher']) { // data not null
          TeacherSyllabusView.validateJSON(data['teacher']);
        }
        // validate the optional field `subject`
        if (data['subject']) { // data not null
          SubjectSyllabusView.validateJSON(data['subject']);
        }

        return true;
    }


}



/**
 * @member {Number} id
 */
CourseSyllabusView.prototype['id'] = undefined;

/**
 * @member {String} name
 */
CourseSyllabusView.prototype['name'] = undefined;

/**
 * @member {module:model/CourseSyllabusView.StatusEnum} status
 */
CourseSyllabusView.prototype['status'] = undefined;

/**
 * @member {String} image
 */
CourseSyllabusView.prototype['image'] = undefined;

/**
 * @member {String} description
 */
CourseSyllabusView.prototype['description'] = undefined;

/**
 * @member {Date} createDate
 */
CourseSyllabusView.prototype['createDate'] = undefined;

/**
 * @member {Number} price
 */
CourseSyllabusView.prototype['price'] = undefined;

/**
 * @member {Number} limitTime
 */
CourseSyllabusView.prototype['limitTime'] = undefined;

/**
 * @member {Number} averagePoint
 */
CourseSyllabusView.prototype['averagePoint'] = undefined;

/**
 * @member {module:model/TeacherSyllabusView} teacher
 */
CourseSyllabusView.prototype['teacher'] = undefined;

/**
 * @member {module:model/SubjectSyllabusView} subject
 */
CourseSyllabusView.prototype['subject'] = undefined;





/**
 * Allowed values for the <code>status</code> property.
 * @enum {String}
 * @readonly
 */
CourseSyllabusView['StatusEnum'] = {

    /**
     * value: "ACTIVE"
     * @const
     */
    "ACTIVE": "ACTIVE",

    /**
     * value: "DEACTIVE"
     * @const
     */
    "DEACTIVE": "DEACTIVE",

    /**
     * value: "PENDING"
     * @const
     */
    "PENDING": "PENDING",

    /**
     * value: "DRAFT"
     * @const
     */
    "DRAFT": "DRAFT",

    /**
     * value: "REJECT"
     * @const
     */
    "REJECT": "REJECT"
};



export default CourseSyllabusView;

