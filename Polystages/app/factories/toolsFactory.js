simpleApp.factory('toolsFactory', function () {
    return {
        // ce document contient les fonction qu'on utlise dans notre application comme notification et pagination

        // Notification 
        notifySucess: function (msg) {
            alertify.set('notifier','position', 'bottom-left');
            alertify.success(msg);
        },

        notifyFailure: function (msg) {
            alertify.set('notifier','position', 'bottom-left');
            alertify.error(msg);
        },

        // Pagination 
        setPagination: function (state,initModify) {
            
            buildTable()
        
            function pagination(querySet, page, rows) {
            
              var trimStart = (page - 1) * rows
              var trimEnd = trimStart + rows
            
              var trimmedData = querySet.slice(trimStart, trimEnd)
            
              var pages = Math.round(querySet.length / rows);
            
              return {
                  'querySet': trimmedData,
                  'pages': pages,
              }
            }
            
            function pageButtons(pages) {
                var wrapper = document.getElementById('pagination-wrapper')
            
                wrapper.innerHTML = ``
            
                var maxLeft = (state.page - Math.floor(state.window / 2))
                var maxRight = (state.page + Math.floor(state.window / 2))
            
                if (maxLeft < 1) {
                    maxLeft = 1
                    maxRight = state.window
                }
            
                if (maxRight > pages) {
                    maxLeft = pages - (state.window - 1)
                    
                    if (maxLeft < 1){
                      maxLeft = 1
                    }
                    maxRight = pages
                }
            
            
            
                for (var page = maxLeft; page <= maxRight; page++) {
                  wrapper.innerHTML += `<button value=${page} class="page btn btn-sm btn-info">${page}</button>`
                }
            
                if (state.page != 1) {
                    wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171; First</button>` + wrapper.innerHTML
                }
            
                if (state.page != pages) {
                    wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">Last &#187;</button>`
                }
            
                $('.page').on('click', function() {
                    $('#table-body').empty()
            
                    state.page = Number($(this).val())
            
                    buildTable()
                })
            }
            
            
            function buildTable() {
              var table = $('#table-body')
        
              $('#table-body').empty()
        
              var data = pagination(state.querySet, state.page, state.rows)
              var myList = data.querySet
            
              for (var i = 1 in myList) {
                  //Keep in mind we are using "Template Litterals to create rows"
                  var row = ` <tr>
                              <th scope="row">${i}</th>
                              <td>${myList[i].titrestage}</td>
                              <td>${myList[i].description}</td>
                              <td>${myList[i].nomentreprise}</td>
                              <td>${myList[i].niveau}</td>
                              <td>${myList[i].annee}</td>
                              <td> <button ng-click="${initModify(myList[i])}" class="btn btn-warning" data-toggle="modal" data-target="#modifyModal">Modifier </button> </td>
                            </tr>`
                  table.append(row)
              }
            
              pageButtons(data.pages)
              delete myList
            }
        } 

    }
})
