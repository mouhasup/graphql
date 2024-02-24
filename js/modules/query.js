export const graphqlQuery = `query GetInfo($objectName: String!) {
    infos:   user {
      lastName
      firstName
      id
      campus
      auditRatio
      email
      totalUp
      totalDown
      attrs
    }
    startproject: group(where: {object: {name: {_eq: $objectName}}}) {
        captainLogin
        path
        status
        members {
          userLogin
        }
    }       
    xp_view: transaction(where: {type: {_eq: "xp"}, path:{_like: "%div-01%", _nlike:"%piscine-js%", _nilike:"%checkpoint%" }}) {
          amount
          path
        }
    skill:   transaction(
      distinct_on: [type]
      where: {type: {_like: "%skill%"}}
      order_by: { type: asc, amount: desc })
      {
      amount
      type
    }
    xp: transaction_aggregate(
      where: {type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
    ) {
      aggregate{
        sum{
          amount
        }
      }
    }
    xp_progress: transaction(where: {type: {_eq: "xp"}, event: {object: {type: {_eq: "module"}}}}
      ){
        amount
        createdAt
      }
       
}`;