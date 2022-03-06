$(document).ready(function () {
    if (localStorage.getItem('Store') == null)
        getStores();
});

function getStores() {
    $.ajax({
        "url": apicon + "/api/Reports/GetReportOnLoad",
        "method": "GET",
        "headers": {
            "SubDomain": subdomain,
            "AccessKey": Encryption(SiteID, subdomain)
        },
        success: gotStores,
        error: gotStores,
    });
}

function gotStores(Response) {
    if (Response != null) {
        stores = JSON.parse(Response);
        for (var i = 0; i < stores.length; i++)
            $('#ddlStores').append($('<option>', { value: stores[i].StoreKey, text: stores[i].Name }));
        $('#storeModal').modal({ backdrop: 'static', keyboard: false })
        $('#storeModal').modal('show');
    }
}

function setStore() {
    var val = $('#ddlStores').val();
    if (val == null || val == '0' || val == '')
        return;

    localStorage.setItem('Store', val)
    $('#storeModal').modal('hide');
}