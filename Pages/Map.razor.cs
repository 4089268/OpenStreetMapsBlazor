using System;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.JSInterop;

namespace OpenStreetMapBlazor.Pages;

public partial class Map {
    
    [Inject]
    public IJSRuntime JSRuntime { get; set; } = default!;

    private readonly Position centerPosition = new(23.736871, -99.150578);

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if(firstRender){
            await JSRuntime.InvokeVoidAsync("initMap", "map", centerPosition );

            await JSRuntime.InvokeVoidAsync("addMarker", centerPosition);

            var circleOptions = new CircleOptions {
                BorderColor = "red",
                FillColor = "salmon",
                FillOpacity = .5,
                Radius = 500
            };
            await JSRuntime.InvokeVoidAsync("addCircle", centerPosition, circleOptions);

        }
    }

}

public class Position {
    public double Lat {get;}
    public double Lon {get;}

    public Position(double l, double n){
        this.Lat = l;
        this.Lon = n;
    }
}

public class CircleOptions {
    public string BorderColor {get;set;} = "red";
    public string FillColor {get;set;} = "red";
    public double FillOpacity {get;set;}
    public double Radius {get;set;}
}