//
//  LoginResponse.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 20/08/24.
//

import Foundation

struct LoginResponse: Decodable {
    let jwtToken: String
    let refreshToken: String
}

/*
 {
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmM0ZWRkYmY3ZDg2ZDdmNmU3OTRjMDAiLCJpYXQiOjE3MjQxODIwMDQsImV4cCI6MTcyNDIxODAwNH0.TdcX_0a-3FaCyZSZmC1IMML_-6UvzuetegTpCbJiYbg",
    "refresh": "fdjkasfkerjineriuoncioer.ecmioerjncvoierjvocierijvc.rvcnioernvoirejnvioerjn"
 }
 */
