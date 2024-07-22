//
//  Event.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 19/07/24.
//

import Foundation
import CoreLocation

struct Event: Codable, Identifiable {
    let id: String
    let sport: String
    let status: Bool
    let location: Location
    let startAt: Date
    let endAt: Date
    let participants: [Participant]
    let maxParticipants: Int
    
    enum CodingKeys: String, CodingKey {
            case id = "_id"
            case sport
            case status
            case startAt
            case endAt
            case participants
            case location
            case maxParticipants
    }
        
    enum NestedIdKeys: String, CodingKey {
        case oid = "$oid"
    }
    
    enum DateKeys: String, CodingKey {
        case date
    }
    
    enum NumberLongKeys: String, CodingKey {
        case numberLong = "$numberLong"
    }
    
    enum NumberDoubleKeys: String, CodingKey {
        case numberDouble = "$numberDouble"
    }
    
    enum NumberIntKeys: String, CodingKey {
        case numberInt = "$numberInt"
    }
    
    struct Participant: Codable {
            var userId: String
            var id: String
            
            enum CodingKeys: String, CodingKey {
                case userId
                case id = "_id"
            }
            
            init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)
                id = try container.decodeNestedId(forKey: .id)
                
                if let userIdContainer = try? container.nestedContainer(keyedBy: NestedIdKeys.self, forKey: .userId) {
                    userId = try userIdContainer.decode(String.self, forKey: .oid)
                } else {
                    userId = try container.decode(String.self, forKey: .userId)
                }
            }
    }
    
    struct Location: Codable {
            var type: String
            var coordinates: [CLLocationDegrees]
            
            enum CodingKeys: String, CodingKey {
                case type
                case coordinates
            }
            
            init(from decoder: Decoder) throws {
                let container = try decoder.container(keyedBy: CodingKeys.self)
                type = try container.decode(String.self, forKey: .type)
                
                var coordinatesContainer = try container.nestedUnkeyedContainer(forKey: .coordinates)
                var coordinates: [CLLocationDegrees] = []
                
                while !coordinatesContainer.isAtEnd {
                    if let coordinateContainer = try? coordinatesContainer.nestedContainer(keyedBy: NumberDoubleKeys.self) {
                        let coordinate = try coordinateContainer.decode(CLLocationDegrees.self, forKey: .numberDouble)
                        coordinates.append(coordinate)
                    }
                }
                
                self.coordinates = coordinates
            }
    }
    
    init(from decoder: Decoder) throws {
            let container = try decoder.container(keyedBy: CodingKeys.self)
            id = try container.decodeNestedId(forKey: .id)
            sport = try container.decode(String.self, forKey: .sport)
            status = try container.decode(Bool.self, forKey: .status)
            startAt = try container.decodeNestedDate(forKey: .startAt)
            endAt = try container.decodeNestedDate(forKey: .endAt)
            participants = try container.decode([Participant].self, forKey: .participants)
            location = try container.decode(Location.self, forKey: .location)
            maxParticipants = try container.decodeNestedInt(forKey: .maxParticipants)
    }
}

extension KeyedDecodingContainer {
    func decodeNestedId(forKey key: K) throws -> String {
        let idContainer = try self.nestedContainer(keyedBy: Event.NestedIdKeys.self, forKey: key)
        return try idContainer.decode(String.self, forKey: .oid)
    }
    
    func decodeNestedDate(forKey key: K) throws -> Date {
        let dateContainer = try self.nestedContainer(keyedBy: Event.DateKeys.self, forKey: key)
        let numberLongContainer = try dateContainer.nestedContainer(keyedBy: Event.NumberLongKeys.self, forKey: .date)
        let timestampString = try numberLongContainer.decode(String.self, forKey: .numberLong)
        guard let timestamp = Double(timestampString) else {
            throw DecodingError.dataCorruptedError(forKey: key as! KeyedDecodingContainer<Event.DateKeys>.Key, in: dateContainer, debugDescription: "Invalid timestamp format")
        }
        return Date(timeIntervalSince1970: timestamp / 1000)
    }
    
    func decodeNestedInt(forKey key: K) throws -> Int {
        let intContainer = try self.nestedContainer(keyedBy: Event.NumberIntKeys.self, forKey: key)
        let intString = try intContainer.decode(String.self, forKey: .numberInt)
        guard let intValue = Int(intString) else {
            throw DecodingError.dataCorruptedError(forKey: key as! KeyedDecodingContainer<Event.NumberIntKeys>.Key, in: intContainer, debugDescription: "Invalid integer format")
        }
        return intValue
    }
}
